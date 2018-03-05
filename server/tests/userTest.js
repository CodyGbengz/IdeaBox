import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../models/user';
import server from '../server';

let token;
const should = chai.should();
chai.use(chaiHttp);

describe('User Controller', () => {
  before((done) => {
    User.remove({}, () => {
      done();
    });
  });

  describe('on successfully user signup', () => {
    it('should return user"s info and token', (done) => {
      const user = {
        email: 'testmail@gmail.com',
        username: 'Rings',
        password: '11111111'
      };
      chai.request(server)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          token = res.body.token;
          res.should.have.status(201);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('User created successfully');
          res.body.user.should.be.an('object');
          res.body.user.username.should.eql('Rings');
          done();
        });
    });
  });

  describe('when a user attempts to register with an existing email', () => {
    it('should return email already exist', (done) => {
      const user = {
        email: 'testmail@gmail.com',
        username: 'Rings',
        password: '11111111'
      };
      chai.request(server)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.status.should.eql('Fail');
          res.body.message.should.eql('This user already exist');
          done();
        });
    });
  });

  describe('when a user attempts to register with an existing username', () => {
    it('should return email already exist', (done) => {
      const user = {
        email: 'estmail@gmail.com',
        username: 'Rings',
        password: '11111111'
      };
      chai.request(server)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.status.should.eql('Fail');
          res.body.message.should.eql('This username is already taken');
          res.body.should.be.an('object');
          done();
        });
    });
  });

  describe('when a user attempts to register with an invalid email', () => {
    it('should field is invalid', (done) => {
      const user = {
        email: 'email',
        username: 'Rings'
      };
      chai.request(server)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.eql('Fail');
          res.body.message[0].should.eql('The email format is invalid.');
          done();
        });
    });
  });

  describe('when a user attempts to register with an invalid username', () => {
    it('should field is invalid', (done) => {
      const user = {
        email: 'email@mail.com',
        username: '',
        password: '11111111'
      };
      chai.request(server)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.eql('Fail');
          res.body.message[0].should.eql('The username field is required.');
          done();
        });
    });
  });

  describe('when user attempts to login with empty username field', () => {
    it('should return username field is required', (done) => {
      const user = {
        username: '',
        password: '111111'
      };
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.eql('Fail');
          res.body.message[0].should.eql('The username field is required.');
          done();
        });
    });
  });

  describe('when a user tries to login with wrong password', () => {
    it('should return wrong password', (done) => {
      const user = {
        username: 'Rings',
        password: '222222'
      };
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.status.should.eql('Fail');
          res.body.message.should.eql('Wrong Password');
          res.body.should.be.an('object');
          done();
        });
    });
  });

  describe('on successful login', () => {
    it('should return an authentication token', (done) => {
      const user = {
        username: 'Rings',
        password: '11111111'
      };
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Login successful');
          res.body.token.should.be.a('string');
          done();
        });
    });
  });

  describe('when a user tries to edit profile without passing a token', () => {
    it('should return  no token is pfovided', (done) => {
      const user = {
        username: 'username',
        email: 'email@email.com'
      };
      chai.request(server)
        .put('/api/v1/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').to.eql('No token provided.');
          done();
        });
    });
  });

  describe('when a user successfully updates his profile', () => {
    it('should return details successfully updated', (done) => {
      const user = {
        username: 'Kings',
      };
      chai.request(server)
        .put('/api/v1/user')
        .set('x-access-token', token)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Details successfully updated');
          res.body.updatedUser.username.should.eql('Kings');
          res.body.updatedUser.should.be.an('object');
          done();
        });
    });
  });

  describe('when a logged in user successfully fetches his profile', () => {
    it('should return status profile fetched successfully', (done) => {
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
  });
});
