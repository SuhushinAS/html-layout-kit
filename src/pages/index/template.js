import html from 'modules/layout/html/index.hbs';
import data from './data.json';
import template from './index.hbs';

export default html({
  body: template(data),
  head: data.head,
});
