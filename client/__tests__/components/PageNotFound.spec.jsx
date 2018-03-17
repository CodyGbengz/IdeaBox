import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import PageNotFound from '../../src/components/PageNotFound';

configure({ adapter: new Adapter() });

describe('Component: PageNotFound', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = shallow(<PageNotFound />);
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
  });
});
