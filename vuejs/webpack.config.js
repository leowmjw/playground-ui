var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

// Init
const TARGET = process.env.npm_lifecycle_event;
process.env.PORT = 4444;
process.env.BABEL_ENV = TARGET;

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
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
                loaders: ['style', 'css'],
                include: PATHS.app
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: PATHS.app
            },
            {
                test: /\.vue$/,
                loaders: ['vue'],
                include: PATHS.app
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'VueJS Base App'
        })
    ]
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        entry: PATHS.app + '/main.js',
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
