// @flow

import html from './index.html';
import svg from 'modules/svg/template';
import logo from 'images/logo.svg';
import {compile} from 'handlebars';

export default (data) => compile(html)({
    ...data,
    logo: svg(logo),
});
