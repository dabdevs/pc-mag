const { Router } = require('express')
const authController = require('../controllers/auth.controller')
const router = Router()
const { body } = require('express-validator');
const User = require('../models/User')

// Validation middleware for user creation
const validateUser = [
    body('email').isEmail().withMessage('Invalid email address').custom(async (value) => {
        // Check if the email already exists in the database
        const user = await User.findOne({ email: value });
        if (user) {
            return Promise.reject('Email is already in use');
        }
        return true;
    }),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').trim().isLength({ max: 50 }).withMessage('Name must be at most 50 characters'),
];

router.post('/register', validateUser, authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

module.exports = router