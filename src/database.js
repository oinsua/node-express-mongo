const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');

mongoose.set('strictQuery', true); // save all file that are in schema

mongoose.connect(MONGODB_URI);


const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB Atlas is connect');
});

