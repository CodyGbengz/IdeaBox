import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { UserProfile } from '../../src/components/UserProfile';
import { e, event } from '../__mocks__/event';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const state = {
  username: '',
  email: '',
  user: {
    username: 'username'
  },
  error: {
    username: '',
    email: ''
  }
};

const props = {
  fetchUserDetails: jest.fn(),
  updateUserProfile: jest.fn()
};

describe('<UserProfile />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
  });
  describe('UserProfile component', () => {
    it('should render correctly', () => {
      wrapper = shallow(<UserProfile store={store} {...state} {...props} />);
      wrapper.instance().componentWillReceiveProps(state);
      expect(wrapper).toBeDefined();
    });

    it(
      `should update component state 
      and call  function when handleSubmit is called`,
      () => {
        wrapper = shallow(<UserProfile store={store} {...state} {...props} />);
        wrapper.instance().handleSubmit(event);
        expect(wrapper.instance().props.updateUserProfile).toHaveBeenCalled();
      }
    );

    it(
      'should update component state when handlechange is called',
      () => {
        wrapper = shallow(<UserProfile store={store} {...state} {...props} />);
        wrapper.instance().handleChange(e);
        e.target.value = 'willy@gmail.com';
        e.target.name = 'email';
        wrapper.instance().handleChange(e);
        e.target.value = 'newuser';
        e.target.name = 'username';
        wrapper.instance().handleChange(e);

        expect(wrapper.instance().state.username).toEqual('newuser');
        expect(wrapper.instance().state.email).toEqual('willy@gmail.com');
      }
    );
  });
});
