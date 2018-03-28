const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require("glob");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path');
const pjson = require('./package.json');
// p['./dist/js/' + pjson.name + '.bundle.js'] = './src/js/main.js';
var p = {}

p['./dist/js/main.bundle.js'] = ['babel-polyfill', './src/js/main.js'];
p['./dist/js/main-header.bundle.js'] = ['./src/js/main-header.js'];
// p['./dist/js/dev/prova1.bundle.js'] = './src/js/dev/prova1.js';

var css = {}
css['./dist/css/' + pjson.name] = './src/sass/' + pjson.name + '.scss';

const extractStyles = (loaders) => {
    return ExtractTextPlugin.extract({
        use: loaders
    });
};

module.exports = [
    {
        entry: p,
        output: {
            path: path.resolve(__dirname),
            pathinfo: true,
            filename: "[name]",
            chunkFilename: "[id].bundle.js"
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: 'src/js/**/*.html',
                    to: 'dist/js/templates/[name].html'
                }
            ]),
        ]
    },
    {
        entry: css,
        output: {
            path: path.resolve(__dirname),
            pathinfo: true,
            filename: "[name].css"
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: extractStyles(['css-loader', 'sass-loader'])
                },
                {
                    test: /\.css$/,
                    use: extractStyles(['css-loader'])
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({ // define where to save the file
                filename: "[name].css",
                allChunks: true
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            contentBase: './',
            historyApiFallback: true,
            inline: true,
            overlay: {
                errors: true,
                warnings: true,
            }
        }
    }
]
