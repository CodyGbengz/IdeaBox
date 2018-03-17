import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { UserIdeas } from '../../src/components/UserIdeas';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const state = {
  ideas: [{ id: '1' }]
};

const props = {
  fetchUserIdeas: jest.fn()
};

describe('<UserIdeas />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
  });
  describe('UserIdeas component', () => {
    it('should render correctly', () => {
      wrapper = shallow(<UserIdeas store={store} {...state} {...props} />);
      wrapper.instance().componentWillReceiveProps(state);
      expect(wrapper).toBeDefined();
    });
  });
});
