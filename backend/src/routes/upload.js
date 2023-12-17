const express = require('express');
const router = express.Router();
require('dotenv').config()
const multer = require('multer');
const path = require('path');

// Multer Configuration
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const AWS = require('aws-sdk')
const s3 = new AWS.S3()

s3.config.update({
    maxRetries: 3,
    httpOptions: { timeout: 30000, connectTimeout: 5000 },
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

router.post('/upload', upload.array('images', 5), async (req, res) => {
    try {
        const images = req.files;

        if (!images || images.length === 0) {
            return res.status(400).json({ error: 'No images uploaded' });
        }

        const uploadPromises = images.map(file => {
            const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: file.originalname,
                Body: file.buffer,
                ContentType: file.mimetype 
            };

            return s3.upload(params).promise();
        });

        Promise.all(uploadPromises)
            .then(data => {
                const fileUrls = data.map(file => file.Location);
                console.log('images uploaded to S3:', fileUrls);
                req.flash('success', 'Images uploaded to S3!');
                res.json({ success: 'Images uploaded to S3', fileUrls });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Error uploading images to S3' });
            });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

module.exports = router;