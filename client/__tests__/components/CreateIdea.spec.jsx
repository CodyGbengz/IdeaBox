import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { CreateIdea } from '../../src/components/CreateIdea';
import { e, event } from '../__mocks__/event';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const state = {
  title: '',
  description: '',
  reactMdeValue: { text: '' },
  category: '',
  disable: true,
  dueBy: '',
  status: '',
  error: {
    title: '',
    description: '',
    status: '',
    category: '',
    dueby: ''
  }
};

const props = {
  createIdeas: jest.fn()
};

describe('<CreateIdea />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  describe('CreateIdea component', () => {
    it('should render correctly', () => {
      wrapper = shallow(<CreateIdea store={store} {...state} {...props} />);
      expect(wrapper).toBeDefined();
    });

    it(
      `should update component state 
      and call create idea function when handleSubmit is called`,
      () => {
        wrapper = shallow(<CreateIdea
          createIdeas={jest.fn()}
        />);
        wrapper.instance().handleSubmit(event);
        expect(wrapper.instance().props.createIdeas).toHaveBeenCalled();
        expect(wrapper.instance().state.disable).toEqual(true);
      }
    );

    it(
      'should update component state when handlechange is called',
      () => {
        wrapper = shallow(<CreateIdea />);
        wrapper.instance().handleChange(e);
        e.target.value = 'idea title';
        e.target.name = 'title';
        wrapper.instance().handleChange(e);
        expect(wrapper.instance().state.title).toEqual('idea title');
      }
    );

    it(
      'should update component state when handlechange with null value is called',
      () => {
        wrapper = shallow(<CreateIdea />);
        e.target.value = '';
        e.target.name = 'title';
        wrapper.instance().handleChange(e);
        expect(wrapper.instance().state.title).toEqual('');
      }
    );
  });
});
