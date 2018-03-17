import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { SearchResults } from '../../src/components/SearchResults';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const state = {
  ideas: [{ id: '1' }]
};

describe('<SearchResults />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
  });
  describe('SearchResults component', () => {
    it('should render correctly', () => {
      wrapper = shallow(<SearchResults store={store} {...state} />);
      wrapper.instance().componentWillReceiveProps(state);
      expect(wrapper).toBeDefined();
    });
  });
});