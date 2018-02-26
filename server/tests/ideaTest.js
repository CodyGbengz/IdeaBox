import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import User from '../models/user';
import Idea from '../models/idea';
import server from '../server';

let token;
const should = chai.should();
chai.use(chaiHttp);

describe('Idea', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {});
    Idea.remove({}, (err) => {
      done()
    })
  });
  describe('/POST /api/user/signup', () => {
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
          token = res.body.token;
          done();
        });
    });
  });
  describe('/POST idea', () => {
    it('should return status 403 when no token is provided', (done) => {
      const idea = {
       title: ' '
      };
      chai.request(server)
        .post('/api/v1/idea')
        .send(idea)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message').to.eql('No token provided.');
          done();
        });
    });
    it('should return status 400 when title field is invalid', (done) => {
      const idea = {
       title: ''
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should return status 400 when description is field invalid', (done) => {
      const idea = {
       description: ''
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should return status 400 when dueBy is field invalid', (done) => {
      const idea = {
       dueBy: ''
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should return status 400 when dueBy is field invalid', (done) => {
      const idea = {
       dueBy: ''
      };
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send(idea)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should return status 200 when a valid request is sent', (done) => {
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
          done();
        });
    });
  });
  describe('GET /api/v1/ideas/user ', () => {
    it('should return status 403 when no token is provided', (done) => {
      chai.request(server)
        .get('/api/v1/ideas/user')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message').to.eql('No token provided.');
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
});
