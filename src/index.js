import App from 'app';
import 'style/index.less';

const root = document.getElementById('root');

if (root) {
    new App(root);

    if (module.hot) {
        module.hot.accept('app', () => {
            new App(root);
        });
    }
}
