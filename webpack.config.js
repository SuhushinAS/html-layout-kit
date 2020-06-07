const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const pages = require('./development/pages');

const nodeEnv = process.env.NODE_ENV || 'development';
const pageRoot = process.env.PAGE_ROOT || '';
const isProd = 'production' === nodeEnv;
const paths = {
    dist: path.join(__dirname, 'www'),
    pages: 'src/pages',
    public: path.join(__dirname, 'public'),
};
const stats = {
    colors: true,
    errorDetails: true,
    reasons: false,
};

const styleLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader';

const pageList = pages(paths.pages, pageRoot);
console.info(pageList);

const webpackConfig = {
    devServer: {
        compress: true,
        contentBase: paths.public,
        disableHostCheck: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        hot: true,
        port: 8000,
        stats,
        writeToDisk: false,
    },
    devtool: isProd ? false : 'eval',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.html$/u,
                use: {
                    loader: 'html-loader',
                    options: {interpolate: true, minimize: false},
                },
            },
            {
                test: /\.hbs$/u,
                use: {
                    loader: 'handlebars-loader',
                    options: {
                        inlineRequires: '(images|icons)/',
                        preventIndent: true,
                        rootRelative: path.join(__dirname, 'src/'),
                    },
                },
            },
            {
                exclude: /node_modules/u,
                test: /\.(js|jsx)$/u,
                use: {
                    loader: 'babel-loader',
                    options: {cacheDirectory: true},
                },
            },
            {
                test: /\.css$/u,
                use: [styleLoader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/u,
                use: [styleLoader, 'css-loader', 'postcss-loader', {loader: 'less-loader'}],
            },
            {
                test: /\.(ttf|woff|woff2)(\?[a-z0-9]+)?$/u,
                use: {
                    loader: 'file-loader',
                    options: {name: 'fonts/[name].[ext]'},
                },
            },
            {
                test: /\.svg$/u,
                use: {
                    loader: 'svg-sprite-loader',
                    options: {
                        esModule: false,
                        extract: true,
                        spriteFilename: 'sprite.svg',
                    },
                },
            },
            {
                test: /.*\.(png|jpg|jpeg|gif)$/iu,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: 'img/[name].[ext]',
                    },
                },
            },
        ],
    },
    node: {
        child_process: 'empty',
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    optimization: {
        minimize: isProd,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({
                canPrint: true,
                cssProcessorPluginOptions: {preset: ['default', {discardComments: {removeAll: true}}]},
            }),
        ],
        namedModules: !isProd,
        noEmitOnErrors: isProd,
    },
    output: {
        filename: '[name].min.js',
        library: ['htmlLayoutKit'],
        path: paths.dist,
        publicPath: '/',
    },
    plugins: [
        ...getPrePlugins(),
        new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(nodeEnv)}}),
        new webpack.IgnorePlugin(/^\.\/locale$/u, /moment$/u),
        ...pageList.map(getHTML),
        new SpriteLoaderPlugin(),
        new CopyPlugin({
            patterns: [{from: paths.public, to: paths.dist}],
        }),
        ...getPostPlugins(),
        checkCorrectBuild,
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['src', 'node_modules'],
    },
    stats,
    watchOptions: {aggregateTimeout: 100},
};

/**
 * Проверить корректность сборки.
 */
function checkCorrectBuild() {
    this.plugin('done', function (stat) {
        if (stat.compilation.errors && stat.compilation.errors.length && isProd) {
            stat.compilation.errors.forEach(console.error);
            process.exit(1);
        }
    });
}

/**
 * Получить набор начальных плагинов.
 * @returns {*[]} Набор начальных плагинов.
 */
function getPrePlugins() {
    if (isProd) {
        return [
            new CleanWebpackPlugin({
                dry: false,
                verbose: true,
            }),
            new webpack.LoaderOptionsPlugin({
                debug: false,
                minimize: true,
                options: {customInterpolateName: (url) => url.toLowerCase()},
            }),
        ];
    }

    return [];
}

/**
 * Получить набор конечных плагинов.
 * @returns {*[]} Набор конечных плагинов.
 */
function getPostPlugins() {
    if (isProd) {
        return [
            new HtmlBeautifyPlugin({
                config: {
                    html: {
                        wrap_line_length: 150,
                    },
                },
            }),
            new MiniCssExtractPlugin({
                allChunks: true,
                disable: false,
                filename: '[name].min.css',
            }),
        ];
    }

    return [];
}

/**
 * Получить настройки для HtmlWebpackPlugin.
 * @param {string} page Страница.
 * @returns {HtmlWebpackPlugin} Настройки для HtmlWebpackPlugin.
 */
function getHTML(page) {
    return new HtmlWebpackPlugin({
        favicon: 'src/images/image.svg',
        filename: `${page}.html`,
        hash: isProd,
        inject: true,
        minify: false,
        scriptLoading: 'defer',
        template: path.join(__dirname, `src/pages/${page}/template.js`),
        templateParameters: {page},
    });
}

module.exports = webpackConfig;
