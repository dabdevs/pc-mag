import { useState } from 'react';
import { upload } from '../api/uploader'
import { getFlashMessages } from '../utils'

export default function ImageUploader({ collection, id, setProducts }) {
    const [flashMessages, setFlashMessages] = useState({});
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const uploadImages = () => {
        try {
            console.log('value request', id, collection)
            setUploading(true)
            const formData = new FormData(document.getElementById('uploadImagesForm'));
            formData.append('id', id)
            formData.append('collection', collection)
            console.log('formData', formData)
            resetFileInput()

            upload(formData).then(({ urls }) => {
                setSuccess(true)
                setError('')
                setUploading(false)

                setProducts(prevProducts => {
                    return prevProducts.map(prod => {
                        if (prod._id == id) {
                            prod.images = urls
                        }
                        return prod
                    });
                });
            }).catch(({ response }) => {
                setError(response.data.error)
                setUploading(false)
                setSuccess(false)
            })
        } catch (err) {
            setError('An error ocurred while uploading the files. Please try again later.')
            setUploading(false)
            setSuccess(false)
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
        <div className='card w-100'>
            {success && <div className='mt-3 alert alert-success'>Images uploaded successfully!</div>}
            {error && <div className='mt-3 alert alert-danger'>{error}</div>}

            <form id='uploadImagesForm' encType="multipart/form-data" className='d-flex gap-3'>
                <input id='images' type='file' name='images' className='form-control border-0' multiple />
                <button onClick={uploadImages} type="button" className='btn btn-primary'>{uploading ? 'Uploading...' : 'Upload'}</button>
            </form>
        </div>
    )
}
