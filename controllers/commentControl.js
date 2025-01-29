const Comment = require('../models/comments');

exports.fetchComments = async (req, res) => {
    
    try {
        console.log('Going to fetch Comments.');
        const blogId = req.params.blogId;
        const comments = await Comment.findAll({
            where: {blogId:blogId},
            order: [['createdAt', 'ASC']]
        });
        res.status(200).json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }    
};

exports.deleteComment = async (req, res) => {
    const commentId=req.params.commentId;
    try {
        const comment = await Comment.findByPk(commentId);

        if(!comment) {
            return res.status(404);
        }

        await comment.destroy();
        res.status(200).json({message: "Comment Deleted!"});
    } catch (err) {
        res.status(500).json({ error: 'Internal server error'});
    }
};