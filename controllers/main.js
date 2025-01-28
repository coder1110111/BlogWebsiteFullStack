const Blog = require('../models/blog');
const Comment = require('../models/comments');

exports.getBlogs = async (req,res,next) => {
    try {
        console.log("Check");
        const blogs = await Blog.findAll({
            include: {
                model: Comment,
                attributes: ['id', 'comment']
            },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(blogs);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};


exports.postAddBlog = (req,res,next) => {
    const { title, author, content } = req.body;
    if(!title || !author || !content) {
        return res.status(400).json({error: 'All fields are required'});
    }
    Blog.create({
        title:title,
        author:author,
        content:content
    }).then(result => {
        res.status(200).json({message: 'Blog submitted successfully', blogId: result.insertId})
    }).catch(err => {
        return res.status(500).json({error: 'Internal server error'});
    })
}

exports.postAddComment = async (req,res,next) => {
    const blogId = req.params.blogId;
    const {comment} = req.body;

    if(!comment) {
        return res.status(400).json({error: 'Comment is required'});
    }
    try {
        const blog = await Blog.findByPk(blogId);
        
        const newComment = await Comment.create({
            blogId: blog.id,
            comments
        });

        res.status(200).json({ message: 'Comment added Successfully', comment: newComment});
    } catch(err) {
        res.status(500).json({error: 'Internal Server Error'});
    }

};