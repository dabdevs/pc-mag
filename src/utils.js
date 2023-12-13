const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
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
export const upload = multer({
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

