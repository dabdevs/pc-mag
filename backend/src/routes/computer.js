const express = require('express');
const router = express.Router();
require('dotenv').config()
const { getAll, getOne, store, update, destroy, getFormData, deleteImage } = require('../controllers/computers.controller')

const computerSchema = require('../validations/computerSchema')
const validationMiddleware = require('../middlewares/validation.middleware')


router.get('/formdata', getFormData)
router.get('', getAll)
router.get('/:id', getOne)
router.post('', validationMiddleware(computerSchema), store)
router.put('/:id', validationMiddleware(computerSchema), update)
router.delete('/:id', destroy)
router.post('/:id/delete-image', deleteImage)

module.exports = router;
