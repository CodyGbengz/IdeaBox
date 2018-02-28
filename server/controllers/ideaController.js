import Idea from '../models/idea';

export default {
  /**
   *
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} response object
   */
  createIdea(req, res) {
    const {
      title,
      description,
      dueBy,
      categories,
      status
    } = req.body;

    const { username, id } = req.decoded;
    const author = { id, username };

    Idea.findOne({
      title: title.trim().toLowerCase()
    })
      .then((existingIdea) => {
        if (existingIdea) {
          return res.status(409).json({
            status: 'Fail',
            message: 'An idea with this title already exists'
          });
        }
        const idea = new Idea({
          title,
          description,
          dueBy,
          categories,
          status,
          author,
        });
        idea.save().then((newidea) => {
          if (!newidea) {
            return res.status(500).json({
              status: 'Fail',
              message: 'An error occured while processing your request'
            });
          }
          return res.status(201).json({
            status: 'Success',
            message: 'Idea created successfully',
            newidea
          });
        })
          .catch((error) => {
            res.status(500).json({
              status: 'Fail',
              message: error.message
            });
          });
      });
  },
  /**
   *
   * @param {object} req - request object
   * @param {object} res -  response object
   * @param {function} next
   * @returns { object} response object
   */
  fetchPublicIdeas(req, res, next) {
    if (req.query.category !== undefined || req.query.search !== undefined) return next();
    Idea.find({ status: 'public' })
      .then((ideas) => {
        if (ideas.length <= 0) {
          return res.status(404).json({
            status: 'Fail',
            message: 'We are out of ideas...'
          });
        }
        return res.status(200).json({
          status: 'Success',
          message: 'Ideas fetched successfully',
          ideas
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
   *
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} response object
   */
  fetchUserIdeas(req, res) {
    Idea.find({ 'author.id': req.decoded.id })
      .then((ideas) => {
        if (ideas.length <= 0) {
          return res.status(404).json({
            status: 'Fail',
            message: 'You seem to be out of ideas'
          });
        }
        return res.status(200).json({
          status: 'Success',
          message: 'Ideas fetched successfully',
          ideas
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
   *
   * @param {object} req - request object
   * @param {object} res -  response object
   * @returns {object} response
   */
  fetchSingleIdea(req, res) {
    Idea.findById(req.params.id)
      .then((idea) => {
        if (!idea) {
          return res.status(404).json({
            status: 'Fail',
            message: 'This Idea does not exist'
          });
        }
        return res.status(200).json({
          status: 'Success',
          message: 'Idea fetched successfully',
          idea
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
   *
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} response
   */
  deleteSingleIdea(req, res) {
    Idea.findById(req.params.id)
      .then((idea) => {
        if (!idea) {
          return res.status(404).json({
            status: 'Fail',
            message: 'Idea not found'
          });
        }
        if (String(idea.author.id) !== req.decoded.id) {
          return res.status(401).json({
            status: 'Fail',
            message: 'You do not have permission to delete this idea'
          });
        }
        const promise = Idea.findByIdAndRemove(req.params.id);
        promise.then(() => res.status(202).json({
          status: 'Success',
          message: 'Idea deleted successfully'
        }))
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
   *
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {function} next - function
   * @returns {object} response object
   */
  fetchByCategory(req, res, next) {
    if (req.query.search !== undefined) return next();
    Idea.find({ status: 'public', categories: req.query.category })
      .then((ideas) => {
        if (ideas.length <= 0) {
          return res.status(404).json({
            status: 'Fail',
            message: 'No ideas under this category yet'
          });
        }
        return res.status(200).json({
          status: 'Success',
          message: 'Ideas fetched successfully',
          ideas
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
   *
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} response object
   */
  searchIdeas(req, res) {
    const searchTerm = req.query.search;
    if (searchTerm === '') {
      return res.status(400).json({
        status: 'Fail',
        message: 'Enter a search keyword'
      });
    }
    Idea.find({
      status: 'public',
      title: new RegExp(searchTerm, 'i')
    })
      .then((ideas) => {
        if (ideas.length <= 0) {
          return res.status(404).json({
            status: 'Fail',
            message: 'No ideas found matching your keyword'
          });
        }
        return res.status(200).json({
          status: 'Success',
          message: 'Ideas fetched successfully',
          ideas
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 'Fail',
          message: error.message
        });
      });
  },
  updateIdea(req, res) {
    Idea.findOneAndUpdate(
      {
        _id: req.params.id,
        'author.id': req.decoded.id
      },
      { $set: req.body },
      { new: true }
    )
      .then(modifiedIdea => res.status(200).json({
        status: 'Success',
        message: 'Idea updated successfully',
        modifiedIdea
      }))
      .catch(error => res.status(500).json({
        status: 'Fail',
        message: error.message
      }));
  }
};

