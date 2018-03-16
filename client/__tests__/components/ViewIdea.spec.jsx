import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { ViewIdea } from '../../src/components/ViewIdea';
import { e, event } from '../__mocks__/event';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const props = {
  fetchSingleIdea: jest.fn(),
  fetchIdeaComments: jest.fn(),
  fetchIdeaRatings: jest.fn(),
  postComment: jest.fn(),
  postRating: jest.fn(),
  params: {
    id: 'kdjaffkfkkd'
  }
};

const state = {
  idea: { id: '1' },
  comments: [],
  content: '',
  ratings: [],
  averageRating: 0,
  userRating: 0
};


describe('<ViewIdea />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  describe('ViewIdea component', () => {
    it('should render correctly', () => {
      wrapper = shallow(<ViewIdea store={store} {...state} {...props} />);
      wrapper.instance().componentWillReceiveProps(state);
      expect(wrapper).toBeDefined();
    });

    it(
      'should update component state when handlechange is called',
      () => {
        wrapper = shallow(<ViewIdea store={store} {...state} {...props} />);
        wrapper.instance().handleChange(e);
        e.target.value = 'changed';
        e.target.name = 'content';
        wrapper.instance().handleChange(e);
        expect(wrapper.instance().state.content).toEqual('changed');
      }
    );

    it(
      `should update component state 
      and call create idea function when handleSubmit is called`,
      () => {
        wrapper = shallow(<ViewIdea store={store} {...state} {...props} />);
        wrapper.instance().postComment(event);
        expect(wrapper.instance().props.postComment).toHaveBeenCalled();
        expect(wrapper.instance().state.content).toEqual('');
      }
    );

    it(
      `should update component state 
      and call create idea function when handleSubmit is called`,
      () => {
        wrapper = shallow(<ViewIdea
          {...state}
          {...props}
          params={props.params}
          postRating={jest.fn()}
        />);
        wrapper.instance().postRating(event);
        expect(wrapper.instance().props.postRating).toHaveBeenCalled();
      }
    );
  });
});
