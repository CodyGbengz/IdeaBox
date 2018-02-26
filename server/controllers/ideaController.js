import Idea from '../models/idea';

export default {
  createIdea(req, res) {
    const {
      title, description, dueBy, categories, status
    } = req.body;
    const { username, id } = req.decoded;
    const author = { id, username };
    const promise = Idea.findOne({
      title: title.trim().toLowerCase()
    }).exec();
    promise.then((existingIdea) => {
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
  }
};
