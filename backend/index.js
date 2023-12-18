const { NotFoundMiddleware, ErrorMiddleware } = require('./src/middlewares');
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');
const crypto = require('crypto');
const mongoose = require('mongoose')
const sessionSecretKey = crypto.randomBytes(64).toString('hex');
require('dotenv').config()
const PORT = process.env.PORT

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'));

app.use(session({
    secret: sessionSecretKey,
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

const routes = require('./src/routes/index');

app.use('/api', routes);

app.use(ErrorMiddleware);
app.use(NotFoundMiddleware);

mongoose.connect(process.env.MONGO_DB_URI);

const DB = mongoose.connection;

DB.on('connecting', function () {
    console.log('connecting to Database...');
}).on('error', function (error) {
    console.error('Error in Database connection: ' + error);
    mongoose.disconnect();
}).on('connected', function () {
    console.log('Database connected!');
}).once('open', function () {
    console.log('Database connection opened!');
}).on('reconnected', function () {
    console.log('Database reconnected!');
}).on('disconnected', function () {
    console.log('Database disconnected!');
    mongoose.connect(process.env.MONGO_DB_URI, { server: { auto_reconnect: true } });
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});