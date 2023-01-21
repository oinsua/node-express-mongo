const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./route/index');
const { PORT, CORS_ORIGIN } = require('./config');


const app = express();

//setting
app.set('PORT', process.env.PORT || PORT);
app.set('AppName', 'Backend MERN');

//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: CORS_ORIGIN ? CORS_ORIGIN : '*' }));

//routes
app.use(routes);


module.exports = app;

