const { Router } = require('express');
const userRouter = require('./user/index');
const noteRouter = require('./note/index');

const routes = Router();

routes.use('/user', userRouter);
routes.use('/note', noteRouter);

module.exports = routes;