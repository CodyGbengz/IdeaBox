import chai from 'chai';
import chaiHttp from 'chai-http';
import Idea from '../models/idea';
import User from '../models/user';
import server from '../server';

let token, ideaId;
const should = chai.should();
chai.use(chaiHttp);

describe('Idea Controller', () => {
  before((done) => {
    User.remove({}).then(() => {});
    Idea.remove({}).then(() => done());
  });
  before((done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .send({
        email: 'ideaguy@email.com',
        username: 'ideaguy',
        password: 'ideaguypassword'
      })
      .end((err, res) => {
        if (res) {
          token = res.body.token;
        }
        done();
      });
  });

  describe('when a user creates an idea without passing a token', () => {
    it('should return status no token provided', (done) => {
      chai.request(server)
        .post('/api/v1/idea')
        .send({})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.status.should.eql('Fail');
          res.body.message.should.eql('No token provided.');
          done();
        });
    });
  });
  describe('when a user tries to post an idea without a title', () => {
    it('should return status 400 when title value is invalid', (done) => {
      const idea = {
        title: ''
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.eql('Fail');
          res.body.message[0].should.eql('The title field is required.');
          done();
        });
    });
  });

  describe('when a user tries to post an idea without a description', () => {
    it('should return message description field is required', (done) => {
      const idea = {
        title: 'titless',
        description: ''
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.eql('Fail');
          res.body.message[0].should.eql('The description field is required.');
          done();
        });
    });
  });

  describe('when a user tries to post an idea without a due date', () => {
    it('should return message dueBy value is required', (done) => {
      const idea = {
        title: 'titles',
        description: 'descriptiondd',
        category: 'science',
        dueBy: ''
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.eql('Fail');
          res.body.message[0].should.eql('The dueBy field is required.');
          done();
        });
    });
  });

  describe('when a user tries to post an idea with an invalid category', () => {
    it('should return category field is required.', (done) => {
      const idea = {
        title: 'title',
        description: 'decriptind',
        category: ''
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.eql('Fail');
          res.body.message[0].should.eql('The category field is required.');
          done();
        });
    });
  });

  describe('when list of public ideas is empty', () => {
    it('should return we are out of ideas.. ', (done) => {
      chai.request(server)
        .get('/api/v1/ideas')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.eql('Fail');
          res.body.message.should.eql('We are out of ideas...');
          done();
        });
    });
  });
  describe('when no ideas exits umder a category', () => {
    it('should return no ideas under this category yet ', (done) => {
      chai.request(server)
        .get('/api/v1/ideas?category=arts')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.eql('Fail');
          res.body.message.should.eql('No ideas under this category yet');
          done();
        });
    });
  });

  describe('when an idea is successfully created', () => {
    it('should return new idea', (done) => {
      const idea = {
        title: 'validtitle',
        description: 'validescription',
        dueBy: '10/12/2019',
        category: 'arts'
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          ideaId = res.body.newidea._id;
          res.should.have.status(201);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Idea created successfully');
          res.body.newidea.should.have.property('title').eql('validtitle');
          done();
        });
    });
  });

  describe('when all public ideas are successfully fetched', () => {
    it('should return a list of ideas', (done) => {
      chai.request(server)
        .get('/api/v1/ideas')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Ideas fetched successfully');
          done();
        });
    });
  });

  describe('when ideas are filtered by category', () => {
    it('should return a list of ideas under a category', (done) => {
      chai.request(server)
        .get('/api/v1/ideas?category=arts')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Ideas fetched successfully');
          done();
        });
    });
  });
  describe('when a user requests for his ideas', () => {
    it('should return message status 401 if no token is provided', (done) => {
      chai.request(server)
        .get('/api/v1/user/ideas')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.status.should.eql('Fail');
          res.body.message.should.eql('No token provided.');
          done();
        });
    });
    it('should return a list ideas if a valid token is passed', (done) => {
      chai.request(server)
        .get('/api/v1/user/ideas')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Ideas fetched successfully');
          res.body.ideas.should.be.an('array');
          done();
        });
    });
  });
  describe('when a user request a single idea"s details', () => {
    it('should return a single idea', (done) => {
      chai.request(server)
        .get(`/api/v1/idea/${ideaId}`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Idea fetched successfully');
          done();
        });
    });
  });
  describe('when user tries to search for an idea', () => {
    it('should return a list of matching ideas', (done) => {
      chai.request(server)
        .get('/api/v1/ideas?search=valid')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Ideas fetched successfully');
          done();
        });
    });
    it('should return 400 when searchTerm value is undefined', (done) => {
      chai.request(server)
        .get('/api/v1/ideas?search=')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.eql('Fail');
          res.body.message.should.eql('Enter a search keyword');
          done();
        });
    });
    it('should return 404 when searchTerm does not find any match', (done) => {
      chai.request(server)
        .get('/api/v1/ideas?search=xxxxxx')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.eql('Fail');
          res.body.message.should.eql('No ideas found matching your keyword');
          done();
        });
    });
  });

  describe('when a user updates an idea successfully', () => {
    it('should return an updated idea', (done) => {
      chai.request(server)
        .put(`/api/v1/idea/${ideaId}`)
        .set('x-access-token', token)
        .send({ title: 'new title' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Idea updated successfully');
          res.body.modifiedIdea.title.should.eql('new title');
          done();
        });
    });
    it('should return status 400 when passed an invalid parameter', (done) => {
      chai.request(server)
        .put('/api/v1/idea/111')
        .set('x-access-token', token)
        .send({ title: 'new title' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.eql('Fail');
          res.body.message.should.eql('Invalid parameter');
          done();
        });
    });
  });
});
