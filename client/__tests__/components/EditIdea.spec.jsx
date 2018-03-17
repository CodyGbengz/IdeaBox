import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { EditIdea } from '../../src/components/EditIdea';
import { e, event } from '../__mocks__/event';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const state = {
  ideas: [{ _id: '' }],
  id: '',
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
  },
};

const props = {
  ideas: [{
    _id: 'kdjaffkfkkd',
    title: '',
    description: '',
    category: '',
  }],
  params: {
    id: 'kdjaffkfkkd'
  },
  editIdeas: jest.fn()
};

describe('<EditIdea />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  describe('EditIdea component', () => {
    it('should render correctly', () => {
      wrapper = shallow(<EditIdea store={store} {...state} {...props} />);
      expect(wrapper).toBeDefined();
    });

    it(
      `should update component state 
      and call editIdea function when handleSubmit is called`,
      () => {
        wrapper = shallow(<EditIdea
          store={store}
          {...state}
          editIdeas={jest.fn()}
          {...props}
        />);
        wrapper.instance().handleSubmit(event);
        expect(wrapper.instance().props.editIdeas).toHaveBeenCalled();
        expect(wrapper.instance().state.disable).toEqual(true);
      }
    );
  });
});
