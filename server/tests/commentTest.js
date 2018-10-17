import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import Idea from '../models/idea';
import User from '../models/user';
import Comment from '../models/comment';

let token, ideaId;
const should = chai.should();

chai.use(chaiHttp);

describe('Comment Controller', () => {
  before((done) => {
    Idea.remove({}).then(() => {});
    User.remove({}).then(() => {});
    Comment.remove({}).then(() => {});
    done();
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
  before((done) => {
    chai.request(server)
      .post('/api/v1/idea')
      .set('x-access-token', token)
      .send({
        title: 'validtitle',
        description: 'validescription',
        dueBy: '10/12/2019',
        category: 'arts'
      })
      .end((err, res) => {
        if (res) {
          console.log(res.body);
          ideaId = res.body.newidea._id;
        }
        done();
      });
  });
  describe('when an idea"s list of comments is empty', () => {
    it('should return no comments posted yet', (done) => {
      chai.request(server)
        .get(`/api/v1/idea/${ideaId}/comments`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.eql('Fail');
          res.body.message.should.eql('No comments posted yet');
          done();
        });
    });
  });
  describe('when a comment is posted successfully', () => {
    it('should return message comment posted successfully', (done) => {
      chai.request(server)
        .post(`/api/v1/idea/${ideaId}/comment`)
        .set('x-access-token', token)
        .send({ content: 'a little something' })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Comment posted successfully');
          res.body.newcomment.content.should.eql('a little something');
          done();
        });
    });
  });
  describe('when an idea"s list of comments is fetched', () => {
    it('should return a list of comments on an idea', (done) => {
      chai.request(server)
        .get(`/api/v1/idea/${ideaId}/comments`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Comments fetched successfully');
          res.body.comments.should.be.an('array');
          done();
        });
    });
  });
  describe('when an idea"s list of comments is fetched', () => {
    it('should return a list of comments on an idea', (done) => {
      chai.request(server)
        .get('/api/v1/idea/5a951b4da3bb4306fb13809/comments')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.eql('Fail');
          res.body.message.should.eql('Invalid parameter');
          done();
        });
    });
  });
});
