// https://github.com/ZengTianShengZ/react-lesson/tree/master/lesson-1
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');
const APP_PATH = path.resolve(ROOT_PATH, 'resources/assets/js');
const APP_FILE = path.resolve(APP_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'public');


module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        index: APP_FILE,
        css: path.resolve(ROOT_PATH, 'resources/assets/sass/app'),
        lib: 'react',
    },
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: '[name].[chunkhash:5].min.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
    },
    module: {
        rules: [{
            test: /\.css$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader',
            }),
        }, {
            test: /\.(js|jsx)$/,
            exclude: /^node_modules$/,
            use: [
                { loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                }, {
                    loader: 'eslint-loader',
                },
            ],
        }, {
            test: /\.less$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader'],
            }),
        }, {
            test: /\.scss$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader'],
            }),
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            use: 'file-loader?name=[name].[ext]',
        }, {
            test: /\.(png|jpg|gif)$/,
            exclude: /^node_modules$/,
            use: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new HtmlWebpackPlugin({
            template: 'resources/views/index.php',
            filename: '../resources/views/index.blade.php',
            hash: false,
        }),
        new ExtractTextPlugin('css/[name].css'),
    ],
};
