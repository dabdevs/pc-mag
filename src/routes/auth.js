const { Router } = require('express')
const authController = require('../controllers/auth.controller')
const router = Router()


router.get('/signup', authController.signupGet)
router.post('/signup', authController.signupPost)
router.get('/login', authController.loginGet)
router.post('/login', authController.loginPost)
router.post('/logout', authController.logout)

module.exports = router