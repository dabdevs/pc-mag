const { ObjectId } = require('mongodb')
const Product = require('../models/Product');
const S3Service = require('../services/s3');
const s3 = new S3Service()

module.exports.upload = async (req, res) => {
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
                const checkProduct = await Product.find({ _id: new ObjectId(id) })
                console.log('Check product: ', checkProduct)
                
                Product.findOneAndUpdate(new ObjectId(id), { $push: { images: uploadedUrls } }, { new: true })
                    .then(updatedProduct => {
                        if (updatedProduct) {
                            console.log('Product updated successfully:', updatedProduct);
                        } else {
                            console.log('Product not found.');
                            throw (error)
                        }
                        res.json({ success: 'Images uploaded to S3', product: updatedProduct });
                    })
                    .catch(error => {
                        console.error('Error updating product:', error);
                        throw (error)
                    });
                break;
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
}