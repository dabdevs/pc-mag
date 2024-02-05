const express = require('express');
const router = express.Router();
require('dotenv').config()
const multer = require('multer');
const sharp = require('sharp')
const { ObjectId } = require('mongodb')
const {
    v4: uuidv4,
} = require('uuid');

const AWS = require('aws-sdk');
const Product = require('../models/Product');
const { resizeImagesAndUploadToS3 } = require('../utils');
const s3 = new AWS.S3()

s3.config.update({
    maxRetries: 3,
    httpOptions: { timeout: 30000, connectTimeout: 5000 },
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

const storage = multer.memoryStorage(); 

const upload = multer({ storage });

router.post('/upload', upload.array('images', process.env.IMAGES_PER_PRODUCT), async (req, res) => {
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

        const resizedImages = await resizeImagesAndUploadToS3(uploadedImages);

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