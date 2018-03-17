import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { FilteredIdeas } from '../../src/components/FilteredIdeas';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const state = {
  ideas: [{ id: '1' }]
};

describe('<FilteredIdeas />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
  });
  describe('FilteredIdeas component', () => {
    it('should render correctly', () => {
      wrapper = shallow(<FilteredIdeas store={store} {...state} />);
      wrapper.instance().componentWillReceiveProps(state);
      expect(wrapper).toBeDefined();
    });
  });
});
