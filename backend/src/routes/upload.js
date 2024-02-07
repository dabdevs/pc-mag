const express = require('express');
const router = express.Router();
require('dotenv').config()
const multer = require('multer');
const { ObjectId } = require('mongodb')
const Product = require('../models/Product');
const S3Service = require('../services/s3');
const s3 = new S3Service()

router.post('/upload', s3.upload().array('images', process.env.IMAGES_PER_PRODUCT), async (req, res) => {
    try {
        const imagesUploadCount = process.env.IMAGES_PER_PRODUCT
        const uploadedImages = req.files;

        const { id, collection } = req.body

        if (!uploadedImages || uploadedImages.length === 0) {
            return res.status(400).json({ error: 'No images uploaded' });
        }

        if (uploadedImages.length > imagesUploadCount) {
            return res.status(400).json({ error: `Upload up to ${imagesUploadCount} images` });
        }

        const resizedImages = await s3.resizeImagesAndUploadToS3(uploadedImages);

        const uploadedUrls = []
        resizedImages.map(path => uploadedUrls.push(path))

        switch (collection) {
            case 'products':
                Product.findOneAndUpdate(new ObjectId(id), { $push: { images: uploadedUrls } }, { new: true })
                    .then(updatedProduct => {
                        if (updatedProduct) {
                            console.log('Product updated successfully:', updatedProduct);
                        } else {
                            console.log('Product not found.');
                            throw (error)
                        }
                    })
                    .catch(error => {
                        console.error('Error updating product:', error);
                        throw (error)
                    });
                break;
        }

        req.flash('success', 'Images uploaded to S3!');
        res.json({ success: 'Images uploaded to S3', urls: uploadedUrls });  
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

module.exports = router;