import { useState } from 'react';
import { upload } from '../api/uploader'
import { useAuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

export default function ImageUploader({ maxImgUpload, collection, id, setImages, setComputers, imagesCount }) {
    const [uploading, setUploading] = useState(false);
    const [btnUploadDisabled, setBtnUploadDisabled] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const {token} = useAuthContext()

    const uploadImages = async () => {
        try {
            setUploading(true)
            const formData = new FormData(document.getElementById('uploadImagesForm'));
            formData.append('id', id)
            formData.append('collection', collection)

            const data = JSON.parse(localStorage.getItem('computerFormData'))

            if (imagesCount + formData.getAll('images').length > data.imagesPerComputer) {
                setUploading(false)
                toast.error(`Upload up to ${data.imagesPerComputer} images`, {
                    position: "bottom-right"
                });
                setInputValue('')
                setBtnUploadDisabled(true)
                return
            }

            const { computer } = await upload(formData, token)

            setComputers(prevComputers => {
                return prevComputers.map(prod => prod._id === computer._id ? computer : prod);
            });
            setImages(computer.images)
            setUploading(false)
            toast.success('Images uploaded successfully', {
                position: "bottom-right"
            });
            setInputValue('')
            setBtnUploadDisabled(true)
        } catch (err) {
            setInputValue('')
            toast.error(err.response.data.error, {
                position: "bottom-right"
            });
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
        <div className='w-100'>
            <h4>Upload up to {maxImgUpload} images (jpg, jpeg)</h4>
            <form id='uploadImagesForm' encType="multipart/form-data" className='d-flex gap-3'>
                <fieldset disabled={uploading} className='w-100 d-flex justify-content-between'>
                    <input value={inputValue} onChange={(e) => inputFileEmpty(e)} id='images' type='file' name='images' className='form-control border' multiple accept="image/*" />
                    <button disabled={btnUploadDisabled} onClick={() => uploadImages()} type="button" className='btn btn-primary'>{uploading ? 'Uploading...' : 'Upload'}</button>
                </fieldset>
                <ToastContainer />
            </form>
        </div>
    )
}
