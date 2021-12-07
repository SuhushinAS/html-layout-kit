const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Получить HTML.
 * @param {string} page Страница.
 * @return {*} HTML.
 */
const getHtml = (page) =>
  new HtmlWebpackPlugin({
    filename: `${page}.html`,
    hash: true,
    inject: true,
    minify: false,
    scriptLoading: 'defer',
    template: `./src/pages/${page}/template.js`,
  });

module.exports = ({pages}) => ({
  plugins: pages.map(getHtml),
});
