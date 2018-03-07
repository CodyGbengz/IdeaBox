import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import SignUp from '../../src/components/Signup/SignUp';
import mockItems from '../__mocks__/mockItems';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const state = {
  username: '',
  email: '',
  password: '',
  disable: true,
  error: {
    email: '',
    username: '',
    password: ''
  }
};
const props = {
  signupRequest: jest.fn()
};
describe('<FavoritesContainer/>', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
  });
  describe('FavoritesContainer component', () => {
    it('should render correctly', () => {
      wrapper = mount(<SignUp store={store} {...state} {...props} />);
      expect(wrapper).toBeDefined();
    });
  });
});
