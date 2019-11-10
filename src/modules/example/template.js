// @flow

import {template} from 'helpers';
import html from './index.html';
import svg from 'modules/svg/template';
import logo from 'images/logo.svg';

export default (data) => template(html)({
    ...data,
    logo: svg(logo),
});
