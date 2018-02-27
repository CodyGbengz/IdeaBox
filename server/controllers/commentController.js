import Idea from '../models/idea';
import Comment from '../models/comment';

export default {
  postComment(req, res) {
    Idea.findById(req.params.id)
      .then((idea) => {
        if (!idea) {
          return res.status(404).json({
            status: 'Fail',
            message: 'This idea doesn"t exist'
          });
        }
        const comment = new Comment({
          content: req.body.content,
          author: {
            id: req.decoded.id,
            username: req.decoded.username
          },
          ideaId: req.params.id
        });
        comment.save().then((newcomment) => {
          res.status(201).json({
            status: 'Success',
            message: 'Comment posted successfully',
            newcomment
          });
        })
          .catch((error) => {
            res.status(500).json({
              status: 'Fail',
              message: error.message
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          status: 'Fail',
          message: error.message
        });
      });
  },
  fetchComments(req, res) {
    Comment.find({ ideaId: req.params.id })
      .then((comments) => {
        if (comments.length <= 0) {
          return res.status(404).json({
            status: 'Fail',
            message: 'No comments posted yet'
          });
        }
        return res.status(200).json({
          status: 'Success',
          message: 'Comments fetched successfully',
          comments
        });
      })
      .catch((error) => {
        res.status(501).json({
          status: 'Fail',
          message: error.message
        });
      });
  }
};
