import { useState } from 'react';
import { upload } from '../api/uploader'
import {getFlashMessages} from '../api/utils'

export default function ImageUploader() {
    const [flashMessages, setFlashMessages] = useState({});
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const uploadImages = () => {
        try {
            setUploading(true)
            const formData = new FormData(document.getElementById('uploadImagesForm'));
            resetFileInput()
            
            upload(formData).then(({error}) => {
                if (error) {
                    setError(true)
                    setUploading(false)
                    return
                }
                setSuccess(true)
                setUploading(false)
            }).catch(err => {
                console.log(err)
                setUploading(false)
            })
        } catch (err) {
            setUploading(false)
            console.log(err)
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

    return (
        <section className='card p-5 m-5 mx-auto w-50'>
            {success && <div className='mt-3 alert alert-success'>Images uploaded successfully!</div>}
            {error && <div className='mt-3 alert alert-danger'>An error ocurred while uploading the files!</div>}

            <form id='uploadImagesForm' encType="multipart/form-data" className='d-flex gap-3'>
                <input id='images' type='file' name='images' className='form-control' multiple />
                <button onClick={uploadImages} type="button" className='btn btn-primary'>{uploading ? 'Uploading...' : 'Upload'}</button>
            </form>
        </section>
    )
}
