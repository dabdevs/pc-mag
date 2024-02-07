import { useState } from 'react';
import { upload } from '../api/uploader'
import { getFlashMessages } from '../utils'

export default function ImageUploader({ collection, id, setAlert, setForm, setProducts }) {
    const [flashMessages, setFlashMessages] = useState({});
    const [uploading, setUploading] = useState(false);

    const uploadImages = () => {
        try {
            console.log('value request', id, collection)
            setUploading(true)
            const formData = new FormData(document.getElementById('uploadImagesForm'));
            formData.append('id', id)
            formData.append('collection', collection)
            console.log('formData', formData)
            resetFileInput()

            upload(formData).then(({ product }) => {
                setAlert({ message: 'Images uploaded successfully', class: 'success' })
                setUploading(false)
                setForm(product)
                setProducts(prevProducts => {
                    return prevProducts.map(prod => {
                        if (prod._id == product._id) {
                            console.log('updated images', product.images)
                            prod.images = product.images
                        }
                        return prod
                    });
                });
            }).catch(({ response }) => {
                setAlert({ message: response.data.error, class: 'danger'})
                setUploading(false)
            })
        } catch (err) {
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

    return (
        <div className='card w-100'>
            <form id='uploadImagesForm' encType="multipart/form-data" className='d-flex gap-3'>
                <input id='images' type='file' name='images' className='form-control border-0' multiple />
                <button onClick={() => uploadImages()} type="button" className='btn btn-primary'>{uploading ? 'Uploading...' : 'Upload'}</button>
            </form>
        </div>
    )
}
