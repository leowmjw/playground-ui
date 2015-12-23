var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');
var basscss = require('postcss-basscss');
var cssnext = require('cssnext');

// Init
const TARGET = process.env.npm_lifecycle_event;
process.env.PORT = 4444;
process.env.BABEL_ENV = TARGET;

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    template: path.join(__dirname, 'template'),
    basscss: path.join(__dirname, 'basscss'),
    styles: path.join(__dirname, 'styles')
};

var common = {
    entry: PATHS.app + '/index.js',
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'cssnext'],
                include: PATHS.app
            },
            {
                test: /\.css$/,
                loaders: [
                    'style',
                    'css',
                    'postcss'
                ],
                include: PATHS.styles
            },
            {
                test: /\.css$/,
                loaders: [
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'postcss'
                ],
                include: PATHS.basscss
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'CSSNext Base App',
            template: PATHS.template + '/my-index.html',
            inject: 'body'
        })
    ],
    cssnext: {
        browsers: "last 2 versions",
    },
    postcss: function () {
        return [
            require('postcss-basscss')({
                raw: true
            })
        ]
    }
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        entry: PATHS.app + '/index.js',
        devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            // stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}
