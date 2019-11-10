// @flow

import {template} from 'helpers';
import footer from 'modules/footer/template';
import header from 'modules/header/index/template';
import layout from 'modules/layout/template';
import example from 'modules/example/template';
import html from './index.html';

export default function() {
    return layout({
        body: template(html)({
            example: example(),
        }),
        footer: footer(),
        header: header(),
    });
}
