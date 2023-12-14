const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models/User')

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization');
    const authToken = token.includes('Bearer') ? token.replace('Bearer ', '') : token
    
    if (!authToken) return res.status(401).send('Access denied.');

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).exec()
        next();
    } catch (error) {
        res.status(403).send('Invalid token.');
    }
};

module.exports = authenticateToken;
