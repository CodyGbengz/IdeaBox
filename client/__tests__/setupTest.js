import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import $ from 'jquery';


global.$ = () => ({
  tabs: () => null,
  attr: () => null,
  sideNav: () => null,
  modal: () => null,
  parallax: () => null,
  show: () => null,
  hide: () => null,
  dropdown: () => null,
  tooltip: () => null,
  click: () => null,
  material_select: () => null,
  collapsible: () => null
});

configure({ adapter: new Adapter() });
