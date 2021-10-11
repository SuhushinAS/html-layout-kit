const path = require('path');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Получить плагины.
 * @param {boolean} isProd Продакшен.
 * @return {*} Плагины.
 */
const getPlugins = (isProd) => (isProd ? [new HtmlBeautifyPlugin({config: {html: {wrap_line_length: 150}}})] : []);

/**
 * Получить HTML.
 * @param {string} src Исходный путь.
 * @return {*} HTML.
 */
const getHtml = (src) => (page) =>
    new HtmlWebpackPlugin({
        filename: `${page}.html`,
        hash: true,
        inject: true,
        minify: false,
        scriptLoading: 'defer',
        template: path.join(src, `pages/${page}/template.js`),
    });

module.exports = ({mode, pages, src}) => ({
    plugins: [...pages.map(getHtml(src)), ...getPlugins('production' === mode)],
});
