const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied.');

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = await User.findById(decoded.userId);
        next();
    } catch (error) {
        res.status(403).send('Invalid token.');
    }
};

module.exports = authenticateToken;
