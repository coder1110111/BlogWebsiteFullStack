const express = require('express');
const router = express.Router();

const commentControllers = require('../controllers/commentControl');

router.get('/get-comment/:blogId', commentControllers.fetchComments);
router.delete('/delete-comment/:commentId', commentControllers.deleteComment);

module.exports = router;