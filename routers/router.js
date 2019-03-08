const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const express = require('express');
const router = express.Router(); 

router.use('/users', userRouter);
router.use('/posts', postRouter);

module.exports = router;