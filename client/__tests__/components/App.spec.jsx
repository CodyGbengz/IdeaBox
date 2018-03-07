import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/components/App';

const props = {
  home: {}
};
describe('<SignupForm />', () => {
  it('renders SignupForm without crashing', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper).toBeDefined();
  });
});
