//https://github.com/ZengTianShengZ/react-lesson/tree/master/lesson-1
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname,"../");
var APP_PATH = path.resolve(ROOT_PATH, 'resources/assets/js');
var APP_FILE = path.resolve(APP_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'public');


module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        index: APP_FILE
    },
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].js',
        publicPath: "/",
        chunkFilename: '[name].[chunkhash:5].min.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css']
    },
    module: {
        rules: [{
            test: /\.css$/,
            exclude:/^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.js$/,
            exclude: /^node_modules$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        }, {
            test: /\.less$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
            })
        }, {
            test: /\.scss$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            use: 'file-loader?name=[name].[ext]'
        }, {
            test: /\.(png|jpg|gif)$/,
            exclude: /^node_modules$/,
            use: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
        }, {
            test: /\.jsx$/,
            exclude: /^node_modules$/,
            use: [
                { loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            ]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new HtmlWebpackPlugin({
            template: 'resources/views/layouts/app.blade',
            filename: '../resources/views/layouts/app.blade.php',
            hash: false
        }),
        new ExtractTextPlugin('css/[name].css')
    ]
};
