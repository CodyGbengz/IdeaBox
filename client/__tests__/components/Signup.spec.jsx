import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import SignUpConnected, { SignUp } from '../../src/components/Signup/SignUp';
import { e, event } from '../__mocks__/event';

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

describe('<Signup/>', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
  });
  describe('Signup component', () => {
    it('should render correctly', () => {
      wrapper = mount(<SignUpConnected store={store} {...state} {...props} />);
      expect(wrapper).toBeDefined();
    });
    it(
      `should update component state 
      and call signup request function when handleSubmit is called`,
      () => {
        wrapper = shallow(<SignUp
          signupRequest={jest.fn()}
        />);
        wrapper.instance().handleSubmit(event);
        expect(wrapper.instance().props.signupRequest).toHaveBeenCalled();
        expect(wrapper.instance().state.disable).toEqual(true);
      }
    );
  });
  it(
    'should update component state when handlechange is called',
    () => {
      wrapper = shallow(<SignUp />);
      wrapper.instance().handleChange(e);
      e.target.value = 'willy@gmail.com';
      e.target.name = 'email';
      wrapper.instance().handleChange(e);
      e.target.value = '123456';
      e.target.name = 'password';
      wrapper.instance().handleChange(e);

      expect(wrapper.instance().state.username).toEqual('Gbenga');
    }
  );

  it(
    'should update component state when handlechange with null value is called',
    () => {
      wrapper = shallow(<SignUp />);
      e.target.value = '';
      wrapper.instance().handleChange(e);
      expect(wrapper.instance().state.username).toEqual('');
    }
  );
  it(
    'should update component state when handlechange with null value is called',
    () => {
      state.error.username = 'username should not be empty';
      wrapper = shallow(<SignUp />);
      e.target.value = '';
      wrapper.instance().handleChange(e);
      expect(wrapper.instance().state.username).toEqual('');
    }
  );
});
