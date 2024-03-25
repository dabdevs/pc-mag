const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models/User')

const checkToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return next()
    
    const authToken = token.includes('Bearer') ? token.replace('Bearer ', '') : token

    if (!authToken) return next();

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.user._id)
        next();
    } catch (error) {
        console.log(error.message)
        res.status(403).send(error.message);
    }
};

module.exports = checkToken;
