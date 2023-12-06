const { PORT } = require('./config/index');
const { NotFoundMiddleware, ErrorMiddleware } = require('./src/middlewares');
const express = require('express');
const app = express();
const cors = require('cors');

const allowedOrigin = process.env.FRONTEND_ORIGIN;
const corsOptions = {
    origin: allowedOrigin,
};

app.use(cors(corsOptions));
app.use(express.json());

const productsRoutes = require('./src/routes/products');

app.use('/api', productsRoutes);

app.use(ErrorMiddleware);
app.use(NotFoundMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});