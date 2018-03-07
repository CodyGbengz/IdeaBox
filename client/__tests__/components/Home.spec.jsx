import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Home from '../../src/components/Home';

describe('<Home />', () => {
  it('renders Home component without crashing', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toBeDefined();
  });
});
