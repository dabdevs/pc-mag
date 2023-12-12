const { PORT } = require('./config/index');
const { NotFoundMiddleware, ErrorMiddleware } = require('./src/middlewares');
const express = require('express');
const app = express();
const cors = require('cors');

const allowedOrigin = process.env.FRONTEND_ORIGIN;

const corsOptions = {
    origin: 'http://localhost:3001',
};

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const productsRoutes = require('./src/routes/products');
const checkoutRoutes = require('./src/routes/checkout');

app.use('/api', productsRoutes);
app.use('/api', checkoutRoutes);

app.use(ErrorMiddleware);
app.use(NotFoundMiddleware);

app.listen(PORT, () => {
    console.log('origin:::', allowedOrigin)
    console.log(`Server is running on port ${PORT}`);
});