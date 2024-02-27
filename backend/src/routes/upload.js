const express = require('express');
const router = express.Router();
require('dotenv').config()
const S3Service = require('../services/s3');
const s3 = new S3Service()
const { upload } = require('../controllers/upload.controller')

router.post('/upload', s3.upload().array('images', process.env.IMAGES_PER_PRODUCT), upload)

module.exports = router;