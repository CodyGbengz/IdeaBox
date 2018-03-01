import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

let token, ideaId
const should = chai.should
chai.use(chaiHttp);

describe('Rate idea', () => {
  describe('Post - /api/v1/user/signup', () => {
    it('should register a new user', (done) => {
      chai.request(server)
        .post('/api/v1/user/signup')
        .send({
          email: 'rater@email.com',
          username: 'rater',
          password: 'raters'
        })
        .end((err, res) => {
          token = res.body.token
          res.body.status.should.eql('Success');
          done();
        })
    })
  })
  describe('Post - /api/v1/idea', () => {
    it('should create a new idea', (done) => {
      chai.request(server)
        .post('/api/v1/idea')
        .set('x-access-token', token)
        .send({
          title: 'overated idea',
          description: 'validescription',
          dueBy: '10/12/2019',
          categories: 'sports'
         })
        .end((err, res) => {

          ideaId = res.body.newidea._id;
          res.body.message.should.eql('Idea created successfully');
          res.body.status.should.eql('Success');
          res.body.newidea.title.should.eql('overated idea');
          done();
        })
    })
  })
  describe('PUT - /api/v1/idea/:IdeaId/rate', () => {
    it('should handling successful idea ratings', (done) => {
        chai.request(server)
          .put(`/api/v1/idea/${ideaId}/rate`)
          .set('x-access-token', token)
          .send({ stars: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.eql('Success')
            res.body.message.should.eql('Rating successful')
            res.body.rating.stars.should.eql(5)
            done();
          })
      })
    })
    describe('GET - /api/v1/idea/:IdeaId/rate', () => {
      it('should get all comments on an idea', (done) => {
          chai.request(server)
            .get(`/api/v1/idea/${ideaId}/rate`)
            .set('x-access-token', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.status.should.eql('Success')
              res.body.message.should.eql('Idea ratings fetched successfully')
              done();
            })
        })
      })
})