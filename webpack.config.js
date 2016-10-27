const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/jsx/App.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            include: [path.resolve(__dirname, 'src')],
	    exclude: [path.resolve(__dirname, 'src', 'server')],
            loader: 'babel',
            query: {
                cacheDirectory: path.resolve(__dirname, 'dist-cache'),
                presets: ['es2015', 'react'],
                plugins: ['transform-runtime']
            }
        }, {
	    test: /\.(less|css)$/,
            include: [
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'node_modules')
            ],
	    loader: ExtractTextPlugin.extract('style', 'css!less')
	}, {
            test: /\.(svg|woff|woff2|otf|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            include: [
                path.resolve(__dirname, 'src', 'fonts'),
                path.resolve(__dirname, 'node_modules', 'bootstrap', 'fonts'),
                path.resolve(__dirname, 'node_modules', 'font-awesome', 'fonts'),
                path.resolve(__dirname, 'node_modules', 'simple-line-icons', 'fonts'),
            ],
            loader: 'file?name=fonts/[name].[ext]'
        }]
    },
    plugins: [
        new ExtractTextPlugin('app.bundle.css'),        
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.less']
    },
    devtool: 'source-map'
};
