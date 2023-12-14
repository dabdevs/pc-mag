const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports.signupGet = (req, res) => {
    res.send('signup get')
}

module.exports.signupPost = async (req, res) => {
    const {email, password, name, role} = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword, name, role})
        res.status(201).send('User registered successfully.');
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Internal server error'})
    }
}

module.exports.loginGet = (req, res) => {
    res.send('login get')
}

module.exports.loginPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        const matched = await bcrypt.compare(password, user.password)
        
        if (!user || !matched) {
            return res.status(401).send('Invalid email or password.');
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.logout = (req, res) => {
    res.send('logout')
}