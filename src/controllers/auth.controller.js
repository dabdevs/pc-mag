const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { validationResult } = require('express-validator');
const { eventEmitter, userCreated } = require('../events/index')

module.exports.register = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, role } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, name, role })
        eventEmitter.emit(userCreated, user)
        
        res.status(201).send('User registered successfully.');
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send('Invalid email or password.');
        }

        const matched = await bcrypt.compare(password, user.password)

        if (!matched) {
            return res.status(401).send('Invalid email or password.');
        }

        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.logout = (req, res) => {
    res.json('logged out')
}