import Rating from '../models/rating';

export default {
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
  }
};
