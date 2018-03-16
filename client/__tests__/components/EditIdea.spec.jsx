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
  ideas: [],
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
  }
};

const props = {
  ideas: [{}],
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
        />);
        wrapper.instance().handleSubmit(event);
        expect(wrapper.instance().props.editIdeas).toHaveBeenCalled();
        expect(wrapper.instance().state.disable).toEqual(true);
      }
    );

    // it(
    //   'should update component state when handlechange is called',
    //   () => {
    //     wrapper = shallow(<EditIdea />);
    //     wrapper.instance().handleChange(e);
    //     e.target.value = 'idea title';
    //     e.target.name = 'title';
    //     wrapper.instance().handleChange(e);
    //     expect(wrapper.instance().state.title).toEqual('idea title');
    //   }
    // );
  });
});
