import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

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

global.Materialize = { toast: jest.fn() };
configure({ adapter: new Adapter() });
