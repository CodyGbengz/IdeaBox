import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { DeleteIdea } from '../../src/components/DeleteIdea';
import { event } from '../__mocks__/event';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const props = {
  deleteIdea: jest.fn(),
  params: {
    id: 'kdjaffkfkkd'
  }
};


describe('<DeleteIdea />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
  });
  describe('DeleteIdea component', () => {
    it('should render correctly', () => {
      wrapper = shallow(<DeleteIdea store={store} {...props} />);
      expect(wrapper).toBeDefined();
    });

    it(
      `should update component state 
    and call Delete idea function when handleSubmit is called`,
      () => {
        wrapper = shallow(<DeleteIdea
          deleteIdea={jest.fn()}
          params={props.params}
        />);
        wrapper.instance().handleDelete(event);
        expect(wrapper.instance().props.deleteIdea).toHaveBeenCalled();
      }
    );
  });
});
