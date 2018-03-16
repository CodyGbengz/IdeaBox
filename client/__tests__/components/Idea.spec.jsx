import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Idea from '../../src/components/common/Idea';

const props = {
  editIdea: jest.fn(),
  deleteIdea: jest.fn(),
  category: '',
  status: '',
  title: '',
  description: '',
  modified: '',
  id: '',
  author: '',
  dueby: ''
};
describe('<Idea />', () => {
  it('renders Idea component without crashing', () => {
    const wrapper = shallow(<Idea {...props} />);
    expect(wrapper).toBeDefined();
  });
});
