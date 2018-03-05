import Idea from '../models/idea';
import Comment from '../models/comment';

export default {
  /**
   * @description post comments controller handles creating comments
   *
   * @param {Object} req - request Object
   * @param {Object} res - request Object
   *
   * @returns {Object} response
   */
  postComment(req, res) {
    Idea.findById(req.params.id)
      .then((idea) => {
        if (!idea) {
          return res.status(404).json({
            status: 'Fail',
            message: 'This idea doesn"t exist'
          });
        }
        if (idea.status === 'private' && (String(idea.author.id) !== req.decoded.id)) {
          return res.status(403).json({
            status: 'Fail',
            message: 'You are not permitted top comment on this idea'
          });
        }
        if (Date.now() > idea.dueBy) {
          return res.status(403).json({
            status: 'Fail',
            message: 'You cannot comment on an idea after it"s due Date'
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
            newcomment: {
              content: newcomment.content
            }
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
  /**
   * @description handles request for fetching comments for an idea
   *
   * @param {Object} req - request Object
   * @param {Object} res - request Object
   *
   * @returns {Object} response
   */
  fetchComments(req, res) {
    if (req.params.id) {
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          status: 'Fail',
          message: 'Invalid parameter'
        });
      }
    }
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
        res.status(500).json({
          status: 'Fail',
          message: error.message
        });
      });
  }
};
