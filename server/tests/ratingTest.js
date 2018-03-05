import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import Idea from '../models/idea';
import User from '../models/user';
import Rating from '../models/rating';

let token, ideaId;
const should = chai.should();
chai.use(chaiHttp);

describe('Rate idea Controller', () => {
  before((done) => {
    Idea.remove({}).then(() => {});
    User.remove({}).then(() => {});
    Rating.remove({}).then(() => {});
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
          ideaId = res.body.newidea._id;
        }
        done();
      });
  });

  describe('when a user successfully rates an idea', () => {
    it('should handling successful idea ratings', (done) => {
      chai.request(server)
        .put(`/api/v1/idea/${ideaId}/rate`)
        .set('x-access-token', token)
        .send({ stars: 5 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Rating successful');
          res.body.rating.stars.should.eql(5);
          done();
        });
    });
  });
  describe('when a user requests for an idea"s ratings', () => {
    it('should get all ratings on an idea', (done) => {
      chai.request(server)
        .get(`/api/v1/idea/${ideaId}/rate`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Idea ratings fetched successfully');
          done();
        });
    });
  });
});
