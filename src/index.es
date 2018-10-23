import App from 'app/index.es';
import 'style/index.less';

const root = document.getElementById('root');

if (root) {
    new App(root);

    if (module.hot) {
        module.hot.accept('app/index.es', () => {
            const HotApp = require('app/index.es').default;

            new HotApp(root)
        });
    }
}
