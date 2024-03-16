import { useState } from 'react';
import { upload } from '../api/uploader'

export default function ImageUploader({ collection, id, setAlert, setImages, setComputers, imagesCount }) {
    const [uploading, setUploading] = useState(false);
    const [btnUploadDisabled, setBtnUploadDisabled] = useState(true)
    const [inputValue, setInputValue] = useState('')

    const uploadImages = async () => {
        try {
            setUploading(true)
            const formData = new FormData(document.getElementById('uploadImagesForm'));
            formData.append('id', id)
            formData.append('collection', collection)

            const data = JSON.parse(localStorage.getItem('computerFormData'))

            if (imagesCount + formData.getAll('images').length > data.imagesPerComputer) {
                setAlert({ message: `Upload up to ${data.imagesPerComputer} images`, class: 'danger' })
                setUploading(false)
                setInputValue('')
                setBtnUploadDisabled(true)
                return
            }

            const { computer } = await upload(formData)

            setComputers(prevComputers => {
                return prevComputers.map(prod => prod._id === computer._id ? computer : prod);
            });
            setImages(computer.images)
            setAlert({ message: 'Images uploaded successfully', class: 'success' })
            setUploading(false)
            setInputValue('')
            setBtnUploadDisabled(true)
        } catch (err) {
            setInputValue('')
            setAlert({ message: err.response.data.error, class: 'danger' })
            setUploading(false)
            setBtnUploadDisabled(true)
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
                    <input value={inputValue} onChange={(e) => inputFileEmpty(e)} id='images' type='file' name='images' className='form-control border-0' multiple accept="image/*" />
                    <button disabled={btnUploadDisabled} onClick={() => uploadImages()} type="button" className='btn btn-primary'>{uploading ? 'Uploading...' : 'Upload'}</button>
                </fieldset>
            </form>
        </div>
    )
}
