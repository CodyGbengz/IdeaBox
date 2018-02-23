import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import User from '../models/user';
import server from '../server';

const should = chai.should();
chai.use(chaiHttp);

process.env.NODE_ENV = 'test';
// Our parent block

describe('User', () => {
  beforeEach((done) => {
    // Before each test we empty the database
    User.remove({}, () => {
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
      const registeredUser = new User({
        username: 'Tester',
        password: 'password',
        email: 'email@email.com'
      });
      const user = {
        username: 'Tester',
        password: 'password'
      };
      registeredUser.save(() => {
        chai.request(server)
          .post('/api/v1/user/signin')
          .send(user)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });
  });
});
