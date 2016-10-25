var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/jsx/App.jsx',
    output: {
        path: '/',
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
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.(svg|woff|woff2|otf|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            include: [
                path.resolve(__dirname, 'src', 'fonts'),
                path.resolve(__dirname, 'node_modules', 'bootstrap', 'fonts'),
                path.resolve(__dirname, 'node_modules', 'font-awesome', 'fonts'),
            ],
            loader: 'file?name=fonts/[name].[ext]'
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.less', '.scss'],
	root: [
	    path.resolve(__dirname, 'src')
	]
    }
};
