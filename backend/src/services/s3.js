const multer = require('multer')
require('dotenv').config()
const AWS = require('aws-sdk');
const s3 = new AWS.S3()
const {
    v4: uuidv4,
} = require('uuid');
const sharp = require('sharp');

s3.config.update({
    maxRetries: 3,
    httpOptions: { timeout: 30000, connectTimeout: 5000 },
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});

class S3Service {
    upload() {
        const storage = multer.memoryStorage()
        const upload = multer({ storage })
        return upload
    }

    async resizeImagesAndUploadToS3(uploadedImages) {
        try {
            const resizedImages = []

            for (const image of uploadedImages) {
                console.log('Resizing:', image)
                const path = `public/${uuidv4()}_${image.mimetype.replace('image/', '.')}`
                const resizedBuffer = await sharp(image.buffer)
                    .resize(parseInt(process.env.IMAGE_WIDTH), parseInt(process.env.IMAGE_HEIGTH), {
                        fit: 'inside',
                    })
                    .jpeg({ quality: 80 })
                    .toBuffer();

                const params = {
                    Bucket: process.env.AWS_BUCKET,
                    Key: path,
                    Body: resizedBuffer
                };

                const uploadResult = await s3.upload(params).promise();
                resizedImages.push(uploadResult.Location);
            }

            return resizedImages
        } catch (error) {
            throw error
        }
    }
    
    async deleteObject(url) {
        try {
            console.log(url)
            const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: url.replace(process.env.AWS_BUCKET_URL, '')
            }

            const data = await s3
                .deleteObject(params)
                .promise();

            return data
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = S3Service;
