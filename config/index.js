if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT || '3000',
    APPLICATION_NAME: process.env.APPLICATION_NAME,
}