const { Router } = require('express');
const authorize = require('../middlewares/auth');
const authRouter = require('./auth');
const usersRouter = require('./users');
const recipeRouter = require('./recipes');
// const chatsRouter = require('./chats');


const router = new Router();

router.use('/', authRouter);
router.use('/users', authorize, usersRouter);
router.use('/recipe', recipeRouter);

module.exports = router;
