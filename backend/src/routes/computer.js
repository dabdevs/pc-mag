const express = require('express');
const router = express.Router();
require('dotenv').config()
const { getAll, getOne } = require('../controllers/computers.controller')

const computerSchema = require('../validations/computerSchema')
const validationMiddleware = require('../middlewares/validation.middleware')

router.get('', getAll)
router.get('/:id', getOne)

module.exports = router;
