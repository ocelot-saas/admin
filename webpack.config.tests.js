var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: [
        path.resolve(__dirname, 'tests/app.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/dist/',
        filename: 'tests.bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react'],
                compact: false
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
            loader: 'url?prefix=font/&limit=10000'
        }]
    }
};
