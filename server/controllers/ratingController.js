import Rating from '../models/rating';

export default {
  /**
   * @description rateIdea controller handles request for rating ideas
   *
   * @param {Object} req - request Object
   * @param {Object} res - request Object
   *
   * @returns {Object} response
   */
  rateIdea(req, res) {
    const query = {
        ideaId: req.params.id,
        authorId: req.decoded.id
      },
      update = {
        stars: req.body.stars,
        authorId: req.decoded.id,
        author: req.decoded.username
      },
      options = { upsert: true, new: true, setDefaultsOnInsert: true };
    Rating.findOneAndUpdate(query, update, options)
      .then((rating) => {
        if (rating) {
          return res.status(200).json({
            status: 'Success',
            message: 'Rating successful',
            rating
          });
        }
        return res.status(404).json({
          status: 'Fail',
          message: 'An error occured while processing your request'
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
   * @description getRating controller handles request for comments on and idea
   * @param {Object} req - request Object
   * @param {Object} res - request Object
   * @returns {Object} response
   */
  getRating(req, res) {
    Rating.find({ ideaId: req.params.id })
      .then((ratings) => {
        if (ratings.length <= 0) {
          return res.status(404).json({
            status: 'Fail',
            message: 'No ratings for this idea yet'
          });
        }
        return res.status(200).json({
          status: 'Success',
          message: 'Idea ratings fetched successfully',
          ratings
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
