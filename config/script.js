const webpack = require('webpack');

/**
 * Обработка имён файлов.
 * @param {string} url Путь до файла.
 * @return {string} Имя файлов.
 */
const customInterpolateName = (url) => url.toLowerCase();

/**
 * Получить плагины.
 * @param {boolean} isProd Продакшен.
 * @return {*} Плагины.
 */
const getPlugins = (isProd) => (isProd ? [new webpack.LoaderOptionsPlugin({debug: false, minimize: true, options: {customInterpolateName}})] : []);

module.exports = ({mode}) => ({
    module: {
        rules: [
            {
                exclude: /node_modules/u,
                test: /\.(js|jsx)$/u,
                use: [{loader: 'babel-loader', options: {cacheDirectory: true}}],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(mode)}}),
        new webpack.IgnorePlugin({contextRegExp: /moment$/u, resourceRegExp: /^\.\/locale$/u}),
        ...getPlugins('production' === mode),
    ],
});