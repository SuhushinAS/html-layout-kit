// @flow

import footer from 'modules/footer/template';
import header from 'modules/header/index/template';
import layout from 'modules/layout/index.html';
import example from 'modules/example/template';
import html from './index.html';
import {compile} from 'handlebars';

export default () => compile(layout)({
    body: compile(html)({
        example: example()
    }),
    footer: footer(),
    header: header(),
});

// export default function() {
//     return layout({
//         body: template(html)({
//             example: example(),
//         }),
//         footer: footer(),
//         header: header(),
//     });
// }
