import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

let token, ideaId;
const should = chai.should();

chai.use(chaiHttp);

describe('Comment', () => {
  describe('Post - /api/v1/user/signup', () => {
    it('should register a new user', (done) => {
      chai.request(server)
        .post('/api/v1/user/signup')
        .send({
          email: 'commenter@email.com',
          username: 'commenter',
          password: 'password'
        })
        .end((err, res) => {
          token = res.body.token;
          res.body.status.should.eql('Success');
          done();
        });
    });
  });
  describe('Post - /api/v1/idea', () => {
    it('should create a new idea', (done) => {
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send({
          title: 'commented idea',
          description: 'validescription',
          dueBy: '10/12/2019',
          categories: 'sports'
        })
        .end((err, res) => {
          ideaId = res.body.newidea._id;
          res.body.message.should.eql('Idea created successfully');
          res.body.status.should.eql('Success');
          res.body.newidea.title.should.eql('commented idea');
          done();
        });
    });
  });
  describe('POST - /api/v1/idea/:IdeaId/rate', () => {
    it('should post a comment on an idea', (done) => {
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
  describe('GET - /api/v1/idea/:IdeaId/comments', () => {
    it('should get all comments on an idea', (done) => {
      chai.request(server)
        .get(`/api/v1/idea/${ideaId}/comment`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
