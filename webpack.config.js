const path = require('path');
const {merge} = require('webpack-merge');
const asset = require('./config/asset');
const base = require('./config/base');
const handlebars = require('./config/handlebars');
const html = require('./config/html');
const optimization = require('./config/optimization');
const pages = require('./config/pages');
const script = require('./config/script');
const style = require('./config/style');
const svg = require('./config/svg');

/**
 * Получить конфигурацию webpack.
 * @param env Окружение.
 * @param argv Аргументы
 * @returns {*} Конфигурация webpack.
 */
function webpackConfig(env, argv) {
  const {mode} = argv;
  const root = __dirname;
  const pageList = pages('src/pages', process.env.PAGE_ROOT || '');
  const options = {
    dist: path.join(root, 'www'),
    mode,
    pages: pageList,
    public: path.join(root, 'public'),
    root,
    src: 'src',
  };
  const clean = 'production' === mode ? true : {keep: /\.svg$/u};
  const result = {
    output: {
      clean,
    },
  };

  console.log(pageList);

  return merge(
    asset(options),
    base(options),
    handlebars(options),
    html(options),
    optimization(options),
    script(options),
    style(options),
    svg(options),
    result
  );
}

module.exports = webpackConfig;
