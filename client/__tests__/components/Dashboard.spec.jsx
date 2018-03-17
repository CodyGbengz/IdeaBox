import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Dashboard } from '../../src/components/Dashboard';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const state = {
  ideas: [{ id: '1' }]
};

const props = {
  fetchAllPublicIdeas: jest.fn()
};

describe('<Dashboard />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
  });
  describe('Dashboard component', () => {
    it('should render correctly', () => {
      wrapper = shallow(<Dashboard store={store} {...state} {...props} />);
      wrapper.instance().componentWillReceiveProps(state);
      expect(wrapper).toBeDefined();
    });
  });
});
