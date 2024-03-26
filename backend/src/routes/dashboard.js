const express = require('express');
const router = express.Router();
require('dotenv').config()
const validationMiddleware = require('../middlewares/validation.middleware')
const computerSchema = require('../validations/computerSchema')
const { getComputers, store, update, destroy, getFormData, deleteImage } = require('../controllers/dashboard.controller')
const uploadRoutes = require('./upload')

router.get('/computers', getComputers)
router.post('/computers', validationMiddleware(computerSchema), store)
router.put('/computers/:id', validationMiddleware(computerSchema), update)
router.delete('/computers/:id', destroy)
router.get('/computers/formdata', getFormData)
router.post('/computers/delete-image/:id', deleteImage)
router.use('/computers/images', uploadRoutes)

module.exports = router;
