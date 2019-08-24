import html from './index.html';
import './style.less';

export default class App {
    constructor(root) {
        root.innerHTML = html;
    }
}
