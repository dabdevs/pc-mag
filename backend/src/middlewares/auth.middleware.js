const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models/User')

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token)
    const authToken = token?.includes('Bearer') ? token?.replace('Bearer ', '') : token
    
    if (!authToken) return res.status(401).send('Access denied.');

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.user._id)
        next();
    } catch (error) {
        console.log(error.message)
        res.status(403).send(error.message);
    }
};

module.exports = authenticateToken;
