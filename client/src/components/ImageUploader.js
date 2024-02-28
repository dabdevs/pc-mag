import { useState } from 'react';
import { upload } from '../api/uploader'

export default function ImageUploader({ collection, id, setAlert, setImages, setProducts, imagesCount }) {
    const [uploading, setUploading] = useState(false);
    const [btnUploadDisabled, setBtnUploadDisabled] = useState(true)
    const [inputValue, setInputValue] = useState('')

    const uploadImages = async () => {
        try {
            setUploading(true)
            const formData = new FormData(document.getElementById('uploadImagesForm'));
            formData.append('id', id)
            formData.append('collection', collection)

            const data = JSON.parse(localStorage.getItem('productFormData'))

            if (imagesCount + formData.getAll('images').length > data.imagesPerProduct) {
                setAlert({ message: `Upload up to ${data.imagesPerProduct} images`, class: 'danger' })
                setUploading(false)
                setInputValue('')
                return
            }

            const { product } = await upload(formData)

            setProducts(prevProducts => {
                return prevProducts.map(prod => prod._id === product._id ? product : prod);
            });
            setImages(product.images)
            setAlert({ message: 'Images uploaded successfully', class: 'success' })
            setUploading(false)
            setInputValue('')
        } catch (err) {
            console.log(err)
            setInputValue('')
            setAlert({ message: 'An error ocurred while uploading the files. Please try again later.', class: 'danger' })
            setUploading(false)
        }
    }

    const inputFileEmpty = (e) => {
        const value = e.target.value
        setInputValue(value)
        value === '' ? setBtnUploadDisabled(true) : setBtnUploadDisabled(false)
    }

    return (
        <div className='card w-100'>
            <form id='uploadImagesForm' encType="multipart/form-data" className='d-flex gap-3'>
                <fieldset disabled={uploading} className='w-100 d-flex justify-content-between'>
                    <input value={inputValue} onChange={(e) => inputFileEmpty(e)} id='images' type='file' name='images' className='form-control border-0' multiple />
                    <button disabled={btnUploadDisabled} onClick={() => uploadImages()} type="button" className='btn btn-primary'>{uploading ? 'Uploading...' : 'Upload'}</button>
                </fieldset>
            </form>
        </div>
    )
}
