import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from '../../src/components/Signup/SignupForm';

const props = {
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  email: '',
  username: '',
  password: '',
  disable: true,
  error: {}
};
describe('<SignupForm />', () => {
  it('renders SignupForm without crashing', () => {
    const wrapper = shallow(<SignupForm {...props} />);
    expect(wrapper).toBeDefined();
  });
});
