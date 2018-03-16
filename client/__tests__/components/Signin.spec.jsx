import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import SigninConnected, { Signin } from '../../src/components/Signin';
import { e, event } from '../__mocks__/event';

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
  signinRequest: jest.fn()
};

describe('<Signin />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
  });
  describe('Signin component', () => {
    it('should render correctly', () => {
      wrapper = mount(<SigninConnected store={store} {...state} {...props} />);
      expect(wrapper).toBeDefined();
    });

    it(
      `should update component state 
      and call signup request function when handleSubmit is called`,
      () => {
        wrapper = shallow(<Signin
          signinRequest={jest.fn()}
        />);
        wrapper.instance().handleSubmit(event);
        expect(wrapper.instance().props.signinRequest).toHaveBeenCalled();
        expect(wrapper.instance().state.disable).toEqual(true);
      }
    );
  });

  it(
    'should update component state when handlechange is called',
    () => {
      wrapper = shallow(<Signin />);
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
});
