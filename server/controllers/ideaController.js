import Idea from '../models/idea';

export default {
  /**
   * @description createIdea controller handle request for creating new ideas
   *
   * @param {Object} req - request Object
   * @param {Object} res - response Object
   *
   * @returns {Object} response Object
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
   * @description fetchPublicIdeas controller handles fetching all ideas that are public
   *
   * @param {Object} req - request Object
   * @param {Object} res -  response Object
   * @param {function} next
   *
   * @returns { Object} response Object
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
   * @description fetchUserIdeas controller handles requests for fetching a user's ideas
   *
   * @param {Object} req - request Object
   * @param {Object} res - response Object
   *
   * @returns {Object} response Object
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
   * @description fetchSingleIdea controller handles request
   *
   * @param {Object} req - request Object
   * @param {Object} res -  response Object
   *
   * @returns {Object} response
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
   * @description deleteSingleIdea controller handles requests to delete an idea
   *
   * @param {Object} req - request Object
   * @param {Object} res - response Object
   *
   * @returns {Object} response
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
        promise.then(() => res.status(200).json({
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
   * @description fetchByCategory controller handles requests for ideas filtered by category
   *
   * @param {Object} req - request Object
   * @param {Object} res - response Object
   * @param {function} next - function
   *
   * @returns {Object} response Object
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
   * @description searchIdeas controller handles search requests
   *
   * @param {Object} req - request Object
   * @param {Object} res - response Object
   *
   * @returns {Object} response Object
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
  /**
   * @description updateIdea controller handles requests to edit an idea
   *
   * @param {Object} req - request Object
   * @param {Object} res - response Object
   *
   * @returns {Object} response
   */
  updateIdea(req, res) {
    const {
      title,
      description,
      category,
      dueBy,
      status
    } = req.body;

    if (!title && !description && !category && !dueBy && !status) {
      return res.status(400).json({
        status: 'Fail',
        message: 'You have to include the field you wish to edit'
      });
    }
    Idea.findOneAndUpdate(
      {
        _id: req.params.id,
        'author.id': req.decoded.id
      },
      {
        $set: req.body,
        modified: true
      },
      { new: true }
    )
      .then((modifiedIdea) => {
        if (modifiedIdea) {
          res.status(200).json({
            status: 'Success',
            message: 'Idea updated successfully',
            modifiedIdea: {
              title: modifiedIdea.title,
              description: modifiedIdea.description,
              categories: modifiedIdea.categories,
              dueBy: modifiedIdea.dueBy,
              modified: true,
              status: modifiedIdea.status
            }
          });
        }
        return res.status(404).json({
          status: 'Fail',
          message: 'Idea not found'
        });
      })
      .catch(error => res.status(500).json({
        status: 'Fail',
        message: error.message
      }));
  }
};

