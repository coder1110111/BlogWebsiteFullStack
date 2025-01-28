const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');

router.get('/get-blogs',mainController.getBlogs);
router.post('/submit-blog', mainController.postAddBlog);
router.post('/add-comment/:BlogId', mainController.postAddComment);

module.exports = router;