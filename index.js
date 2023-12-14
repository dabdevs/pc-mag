const { NotFoundMiddleware, ErrorMiddleware } = require('./src/middlewares');
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const database = require('./database')
const flash = require('connect-flash');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');
require('dotenv').config()
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

// app.use('/bull-board', require('bull-board').UI);

app.get('/api/flash-messages', (req, res) => {
    const allFlashMessages = {
        success: req.flash('success'),
        info: req.flash('info'),
        error: req.flash('error')
    };
    res.json(allFlashMessages);
});

const productsRoutes = require('./src/routes/products');
const checkoutRoutes = require('./src/routes/checkout');
const uploadRoutes = require('./src/routes/upload');

app.use('/api', productsRoutes);
app.use('/api', checkoutRoutes);
app.use('/api', uploadRoutes);

app.use(ErrorMiddleware);
app.use(NotFoundMiddleware);

database.connect().catch(err => console.log(err));

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});