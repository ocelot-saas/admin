module.exports = {
    entry: {
	app: './src/app.js',
	tests: './tests/app.js',
    },
    output: {
        path: './build',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }]
    }
};
