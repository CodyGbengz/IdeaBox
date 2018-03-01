import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import User from '../models/user';
import Idea from '../models/idea';
import server from '../server';

let token, id;
const should = chai.should();
chai.use(chaiHttp);

describe('Idea', () => {
  before((done) => {
    User.remove({}, (err) => {});
    Idea.remove({}, (err) => {});
    done();
    
  });
  describe('POST/api/user/signup', () => {
    it('should return status 200 for a successful signup', (done) => {
      chai.request(server)
        .post('/api/v1/user/signup')
        .send({
          email: 'ideaguy@email.com',
          username: 'ideaguy', 
          password: 'ideaguypassword'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('User created successfully')
          token = res.body.token;
          done();
        });
    });
  });
  describe('POST /api/v1/idea', () => {
    it('should return status 403 when no token is provided', (done) => {
      const idea = {
       title: ' '
      };
      chai.request(server)
        .post('/api/v1/idea')
        .send(idea)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.status.should.eql('Fail')
          res.body.message.should.eql('No token provided.');
          done();
        });
    });
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
          res.body.status.should.eql('failed');
          res.body.message[0].should.eql('The title field is required.');
          done();
        });
    });
    it('should return status 400 when description value invalid', (done) => {
      const idea = {
        title:'titless',
       description: ''
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.eql('failed');
          res.body.message[0].should.eql('The description field is required.');
          done();
        });
    });
    it('should return status 400 when dueBy value is invalid', (done) => {
      const idea = {
        title: 'titles',
        description: 'descriptiondd',
        dueBy: ''
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.eql('failed');
          res.body.message[0].should.eql('The categories field is required.');
          done();
        });
    });
    it('should return status 400 when categories value invalid', (done) => {
      const idea = {
       title: 'title',
       description: 'decriptind',
       categories: 'science'
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.eql('failed');
          res.body.message[0].should.eql('The dueBy field is required.')
          done();
        });
    });
    it('should return 404 when no ideas are found ', (done) => {
      chai.request(server)
      .get('/api/v1/ideas')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.status.should.eql('Fail')
        res.body.message.should.eql('We are out of ideas...')
        done();
      });
    })
    it('should return 404 when no categories are found ', (done) => {
      chai.request(server)
      .get('/api/v1/ideas?category=arts')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.status.should.eql('Fail');
        res.body.message.should.eql('No ideas under this category yet')
        done();
      });
    })
    it('should return status 201 when a valid request is sent', (done) => {
      const idea = {
       title: 'validtitle',
       description: 'validescription',
       dueBy: '10/12/2019',
       categories: 'sports'
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Idea created successfully');
          res.body.newidea.should.have.property('title').eql('validtitle');
          done();
        });
    });
    it('should return 200 when ideas are successfully fetched ', (done) => {
      chai.request(server)
      .get('/api/v1/ideas')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.status.should.eql('Success');
        res.body.message.should.eql('Ideas fetched successfully')
        done();
      });
    })
    it('should return 200 when ideas are successfully fetched', (done) => {
      chai.request(server)
      .get('/api/v1/ideas?category=sports')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.status.should.eql('Success');
        res.body.message.should.eql('Ideas fetched successfully')
        done();
      });
    })
    
  });
  describe('GET /api/v1/ideas/user ', () => {
    it('should return status 200 when a valid request is sent', (done) => {
      const idea = {
       title: 'Another title',
       description: 'validescription',
       dueBy: '10/12/2019',
       categories: 'sports'
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.status.should.eql('Success');
          done();
        });
    });
    it('should return status 403 when no token is provided', (done) => {
      chai.request(server)
        .get('/api/v1/ideas/user')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.status.should.eql('Fail')
          res.body.message.should.eql('No token provided.');
          done();
        });
    });
    it('should return status 200 ', (done) => {
      chai.request(server)
        .get('/api/v1/ideas/user')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Ideas fetched successfully')
          done();
        });
    });
  });
  describe('GET /api/v1/idea/:id ', () => {
    it('should return status 201 when idea is created successfully', (done) => {
      const idea = {
       title: 'single Idea',
       description: 'validescription',
       dueBy: '10/12/2019',
       categories: 'sports'
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          id = res.body.newidea._id;
          res.should.have.status(201);
          done();
        });
    });
    it('should return status 200', (done) => {
      chai.request(server)
        .get(`/api/v1/idea/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Idea fetched successfully')
          done();
        });
    });
    it('should return status 200', (done) => {
      chai.request(server)
        .get(`/api/v1/ideas?search=single`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Ideas fetched successfully')
          done();
        });
    });
    it('should return 400 when searchTerm value is empty', (done) => {
      chai.request(server)
      .get(`/api/v1/ideas?search=`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.status.should.eql('Fail')
        res.body.message.should.eql('Enter a search keyword')
        done();
      })
    })
    it('should return 404 when searchTerm does not find any match', (done) => {
      chai.request(server)
      .get(`/api/v1/ideas?search=xxxxxx`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.status.should.eql('Fail')
        res.body.message.should.eql('No ideas found matching your keyword')
        done();
      })
    })
  });
  describe('PUT /api/v1/idea/:id ', () => {
    it('should return status 201 when a new idea is created', (done) => {
      const idea = {
       title: 'Editable Idea',
       description: 'validescription',
       dueBy: '10/12/2019',
       categories: 'sports'
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          id = res.body.newidea._id;
          res.should.have.status(201);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Idea created successfully');
          done();
        });
    });
    it('should return status 200', (done) => {
      chai.request(server)
        .put(`/api/v1/idea/${id}`)
        .set('x-access-token', token)
        .send({title: 'new title'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.eql('Success')
          res.body.message.should.eql('Idea updated successfully');
          res.body.modifiedIdea.title.should.eql('new title');
          done();
        });
    });
    it('should return status 400 when passed an invalid parameter', (done) => {
      chai.request(server)
        .put(`/api/v1/idea/111`)
        .set('x-access-token', token)
        .send({title: 'new title'})
        .end((err, res) => {
          res.should.have.status(500);
          res.body.status.should.eql('Fail');
          done();
        });
    });
  });
});
