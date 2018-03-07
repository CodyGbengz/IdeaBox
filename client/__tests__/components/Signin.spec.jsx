import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Signin from '../../src/components/Signin';
import mockItems from '../__mocks__/mockItems';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const state = {
  username: '',
  password: '',
  disable: true,
  error: {
    username: '',
    password: ''
  }
};
const props = {
  SigninRequest: jest.fn()
};
describe('<Signin />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
  });
  describe('Signin component', () => {
    it('should render correctly', () => {
      wrapper = mount(<Signin store={store} {...state} {...props} />);
      expect(wrapper).toBeDefined();
    });
  });
});
