const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const {
    v4: uuidv4,
} = require('uuid');
const sharp = require('sharp');

s3.config.update({
    maxRetries: 3,
    httpOptions: { timeout: 30000, connectTimeout: 5000 },
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

require('dotenv').config()

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
module.exports.upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1 MB
}).array('images', 5); 

const uploadImages = () => {
    try {
        s3.putObject({
            Body: 'Hello world',
            Bucket: 'dabdevs-pc-mag',
            Key: 'my-file.jpg'
        }).promise();
    } catch (err) {
        console.error(err)
    }
}

module.exports.formatPrice = (priceInCents) => {
    const dollars = Math.floor(priceInCents / 100);
    const cents = priceInCents % 100;
    return `${dollars}.${cents.toString().padStart(2, '0')}`;
};

module.exports.resizeImage = async (inputPath, outputPath) => {
    return new Promise((resolve, reject) => {
        sharp(inputPath)
            .resize({ width: 100, height: 100 }) // Resize to width 100 and height 100
            .toFile(outputPath, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`Resized ${inputPath} and saved as ${outputPath}`);
                    resolve(info);
                }
            });
    });
}

module.exports.resizeImagesAndUploadToS3 = async (uploadedImages) => {
    try {
        const resizedImages = []

        for (const image of uploadedImages) {
            console.log('Resizing:', image)
            const path = `public/${uuidv4()}_${image.mimetype.replace('image/', '.')}`

            const resizedBuffer = await sharp(image.buffer)
                .resize(1200, 1800)
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



