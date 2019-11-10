// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const fs = require('fs');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OfflinePlugin = require('offline-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = 'production' === nodeEnv;
const paths = {
    dist: path.join(__dirname, 'www'),
    pages: './src/pages',
    public: path.join(__dirname, 'public'),
};
const stats = {
    colors: true,
    errorDetails: true,
    reasons: false,
};

const pages = fs.readdirSync(paths.pages);

module.exports = function() {
    return {
        devServer: {
            contentBase: paths.dist,
            host: '0.0.0.0',
            hot: true,
            port: 8000,
            stats,
            writeToDisk: true,
        },
        devtool: isProd ? false : 'eval',
        entry: pages.reduce((acc, page) => ({...acc, [page]: `${paths.pages}/${page}/index.js`}), {}),
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
                    exclude: /node_modules/u,
                    test: /\.(js|jsx)$/u,
                    use: {
                        loader: 'babel-loader',
                        options: {cacheDirectory: true},
                    },
                },
                {
                    test: /\.css$/u,
                    use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'],
                },
                {
                    test: /\.less$/u,
                    use: [
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'less-loader',
                            options: {javascriptEnabled: true},
                        },
                    ],
                },
                {
                    test: /\.(ttf|eot|woff|woff2)(\?[a-z0-9]+)?$/u,
                    use: {
                        loader: 'file-loader',
                        options: {name: 'fonts/[name].[hash:5].[ext]'},
                    },
                },
                {
                    test: /\.svg$/u,
                    use: {
                        loader: 'svg-sprite-loader',
                        options: {
                            esModule: true,
                            extract: true,
                            spriteFilename: 'sprite-[hash:5].svg',
                        },
                    },
                },
                {
                    test: /.*\.(png|jpg|jpeg|gif)$/iu,
                    use: {
                        loader: 'file-loader',
                        options: {name: 'img/[name].[hash:5].[ext]'},
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
            filename: 'js/[name].min.js',
            library: ['htmlLayoutKit'],
            path: paths.dist,
            publicPath: '/',
        },
        plugins: [
            ...getPlugins(),
            new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(nodeEnv)}}),
            new webpack.IgnorePlugin(/^\.\/locale$/u, /moment$/u),
            ...pages.map(getHTML),
            new HtmlBeautifyPlugin({config: {html: {wrap_line_length: 150}}}),
            new SpriteLoaderPlugin({plainSprite: true}),
            new CopyPlugin([{from: paths.public, to: paths.dist}]),
            new OfflinePlugin({
                externals: ['/api/v1/config'],
            }),
        ],
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: ['src', 'node_modules'],
        },
        stats,
        watchOptions: {aggregateTimeout: 100},
    };
};

function getHTML(page) {
    return new HtmlWebpackPlugin({
        chunks: [page],
        filename: `${page}.html`,
        hash: true,
        inject: true,
        minify: false,
        template: 'src/index.tpl',
        templateParameters: {page},
    });
}

function getCritical(page) {
    const fileName = `${page}.html`;

    return new HtmlCriticalWebpackPlugin({
        base: paths.dist,
        dest: fileName,
        extract: true,
        height: 565,
        inline: true,
        minify: true,
        penthouse: {
            blockJSRequests: false,
        },
        src: fileName,
        width: 375,
    });
}

function getPlugins() {
    if (isProd) {
        return [
            new CleanWebpackPlugin({
                dry: false,
                verbose: true,
            }),
            new FaviconsWebpackPlugin({
                cache: true,
                favicons: {
                    appName: 'HTML Layout Kit',
                    background: '#0f1418',
                    theme_color: '#0f1418',
                },
                inject: true,
                logo: 'favicon.svg',
                outputPath: '/',
                prefix: '/',
                publicPath: '/',
            }),
            new MiniCssExtractPlugin({
                allChunks: true,
                disable: false,
                filename: 'css/[name].min.css',
            }),
            new webpack.LoaderOptionsPlugin({
                debug: false,
                minimize: true,
                options: {customInterpolateName: (url) => url.toLowerCase()},
            }),
            ...pages.map(getCritical),
            new ImageminWebpWebpackPlugin(),
            // new BundleAnalyzerPlugin(),
        ];
    }

    return [new webpack.HotModuleReplacementPlugin()];
}
