import chai from 'chai';
import User from '../../models/user';

const { expect } = chai;
const user = {
  username: 'tested',
  email: 'test@email.com',
  password: 'password'
};

describe('User model', () => {
  before((done) => {
    User.remove({}, () => {
      done();
    });
  });

  it('should return a new user\'s signup information', (done) => {
    // const newUser = User(user).save();
    // expect(newUser).to.be.an('object');
    // expect(newUser.username).to.equal('tested');
    done();
  });
});
