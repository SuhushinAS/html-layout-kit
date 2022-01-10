import menu from 'data/menu.json';
import data from './data.json';
import template from './index.hbs';

export default template({
  menu,
  ...data,
});
