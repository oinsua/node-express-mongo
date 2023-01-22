const { Router } = require('express');
const userRouter = require('./user/index');
const noteRouter = require('./note/index');
const { castError, finalError } = require('../middleware/error');

const routes = Router();

routes.use('/user', userRouter);
routes.use('/note', noteRouter);
routes.use(castError);
routes.use(finalError);

module.exports = routes;