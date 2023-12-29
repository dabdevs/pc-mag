const { Router } = require('express')
const authController = require('../controllers/auth.controller')
const router = Router()

const userCreationShema = require('../validations/userCreationSchema')
const validationMiddleware = require('../middlewares/validation.middleware')

router.post('/register', validationMiddleware(userCreationShema), authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

module.exports = router