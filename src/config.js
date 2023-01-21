const { config } = require('dotenv');

config();

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    SECRET: process.env.SECRET
};