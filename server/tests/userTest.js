import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import User from '../models/user';
import server from '../server';

let token;
const should = chai.should();
chai.use(chaiHttp);

// process.env.NODE_ENV = 'test';
// Our parent block

describe('User', () => {
  before((done) => {
    User.remove({}, () => {});
    chai.request(server)
      .post('/api/v1/user/signup')
      .send({
        email: 'valid@email.com',
        username: 'validguy',
        password: 'validpassword'
      })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  /*
  * Test the /GET route
  */
  describe('/POST user', () => {
    it('should return status 400 when email field is invalid', (done) => {
      const user = {
        username: 'Rings',
        password: '11111111'
      };
      chai.request(server)
        .post('/api/v1/user/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should return status 400 when username field is invalid', (done) => {
      const user = {
        email: 'email@email.com',
        password: '11111111'
      };
      chai.request(server)
        .post('/api/v1/user/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should return status 400 when password field is invalid', (done) => {
      const user = {
        email: 'emails@email.com',
        username: 'Rings'
      };
      chai.request(server)
        .post('/api/v1/user/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should return status 201 when request contains all required field', (done) => {
      const user = {
        email: 'emails@email.com',
        username: 'Rings',
        password: 'password'
      };
      chai.request(server)
        .post('/api/v1/user/signup')
        .send(user)
        .end((err, res) => {
          // token = res.body.token;
          res.should.have.status(201);
          res.body.should.have.property('status').eql('Success');
          done();
        });
    });
  });
  describe('POST/api/v1/user/signin route', () => {
    it('should return status 400 when username is invalid', (done) => {
      const user = {
        username: '',
        password: '111111'
      };
      chai.request(server)
        .post('/api/v1/user/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should return status 400 when password is invalid', (done) => {
      const user = {
        username: 'Rings',
        password: ''
      };
      chai.request(server)
        .post('/api/v1/user/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should return status 200 for valid user inputs', (done) => {
      const user = {
        username: 'validguy',
        password: 'validpassword'
      };
      chai.request(server)
        .post('/api/v1/user/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Login successful');
          done();
        });
    });
  });

  describe('PUT/api/v1/user route', () => {
    it('should return status 403 when no token is passed', (done) => {
      const user = {
        username: 'username',
        email: 'email@email.com'
      };
      chai.request(server)
        .put('/api/v1/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message').to.eql('No token provided.');
          done();
        });
    });
    it('should return status 400 when username is invalid', (done) => {
      const user = {
        username: '',
        email: 'email@email.com'
      };
      chai.request(server)
        .put('/api/v1/user')
        .set('x-access-token', token)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should return status 400 when email is invalid', (done) => {
      const user = {
        username: 'Rings',
        email: ''
      };
      chai.request(server)
        .put('/api/v1/user')
        .set('x-access-token', token)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('GET-/api/v1/user route', () => {
    it('should return status 200 when a valid token is passed', (done) => {
      chai.request(server)
        .get('/api/v1/user')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Profile fetched successfully');
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status 403 when token is invalid', (done) => {
      chai.request(server)
        .get('/api/v1/user')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message').to.eql('No token provided.');
          done();
        });
    });
  });
});
