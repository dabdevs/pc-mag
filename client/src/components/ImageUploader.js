import { useState } from 'react';
import { upload } from '../api/uploader'
import { getFlashMessages } from '../utils'

export default function ImageUploader({ collection, id, setAlert, setImages, setProducts, imagesCount }) {
    const [uploading, setUploading] = useState(false);
    const [btnUploadDisabled, setBtnUploadDisabled] = useState(true)

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
                resetFileInput()
                return
            }

            const {product} = await upload(formData)

            setProducts(prevProducts => {
                return prevProducts.map(prod => prod._id === product._id ? product : prod);
            });
            setImages(product.images)
            setAlert({ message: 'Images uploaded successfully', class: 'success' })
            setUploading(false)
        } catch (err) {
            console.log(err)
            resetFileInput()
            setAlert({ message: 'An error ocurred while uploading the files. Please try again later.', class: 'danger' })
            setUploading(false)
        }
    }

    function resetFileInput() {
        var formElement = document.getElementById('uploadImagesForm');

        // Create a new input element with the same attributes
        var newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.id = 'images';
        newInput.name = 'images';
        newInput.multiple = true;
        newInput.classList.add('form-control')

        // Replace the existing input with the new one
        formElement.replaceChild(newInput, document.getElementById('images'));
    }

    const inputFileEmpty = (e) => {
        e.target.value === '' ? setBtnUploadDisabled(true) : setBtnUploadDisabled(false)
    }

    return (
        <div className='card w-100'>
            <form id='uploadImagesForm' encType="multipart/form-data" className='d-flex gap-3'>
                <fieldset disabled={uploading} className='w-100 d-flex justify-content-between'>
                    <input onChange={(e) => inputFileEmpty(e)} id='images' type='file' name='images' className='form-control border-0' multiple />
                    <button disabled={btnUploadDisabled} onClick={() => uploadImages()} type="button" className='btn btn-primary'>{uploading ? 'Uploading...' : 'Upload'}</button>
                </fieldset>
            </form>
        </div>
    )
}
