const { ObjectId } = require('mongodb')
const Computer = require('../models/Computer');
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
            case 'computers':
                const checkComputer = await Computer.find({ _id: new ObjectId(id) })
                console.log('Check computer: ', checkComputer)
                
                Computer.findOneAndUpdate(new ObjectId(id), { $push: { images: uploadedUrls } }, { new: true })
                    .then(updatedComputer => {
                        if (!updatedComputer) {
                            throw (error)
                        } 
                        res.json({ success: 'Images uploaded successfully', computer: updatedComputer });
                    })
                    .catch(error => {
                        console.error('Error updating computer:', error);
                        throw (error)
                    });
                break;
        }
    } catch (err) {
        console.error('Error fetching data:', err.message);
        res.status(500).json({ error: err.message});
    }
}