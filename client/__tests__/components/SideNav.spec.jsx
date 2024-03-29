import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { SideNav } from '../../src/components/common/SideNav';
import { e, event } from '../__mocks__/event';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const asyncFunction = () => {
  return Promise.resolve();
};

const state = {
  searchTerm: ''
};

const props = {
  filterIdeas: jest.fn(asyncFunction),
  searchIdeas: jest.fn(asyncFunction)
};

describe('<SideNav />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
  });
  describe('SideNav component', () => {
    it('should render correctly', () => {
      wrapper = shallow(<SideNav store={store} {...state} {...props} />);
      expect(wrapper).toBeDefined();
    });

    it(
      'should update component state when handlechange is called',
      () => {
        wrapper = shallow(<SideNav store={store} {...state} {...props} />);
        wrapper.instance().handleChange(e);
        e.target.value = 'search';
        e.target.name = 'searchTerm';
        wrapper.instance().handleChange(e);
        expect(wrapper.instance().state.searchTerm).toEqual('search');
      }
    );

    it(
      'should update component state when handleSearch is called',
      () => {
        wrapper = shallow(<SideNav store={store} {...state} {...props} />);
        wrapper.instance().handleChange(e);
        e.target.value = 'search';
        e.target.name = 'searchTerm';
        wrapper.instance().handleSearch(event);
        expect(wrapper.instance().state.searchTerm).toEqual('search');
      }
    );

    it(
      'should update component state when handleFilter is called',
      () => {
        wrapper = shallow(<SideNav store={store} {...state} {...props} />);
        wrapper.instance().handleFilter(e);
        expect(wrapper.instance().props.filterIdeas).toHaveBeenCalled();
      }
    );
  });
});
