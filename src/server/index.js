const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('./config');
const webpackConfig = require('../../webpack.config');


const app = express();

if (config.ENV == 'LOCAL') {
    const middleware = webpackDevMiddleware(webpack(webpackConfig), {
	publicPath: webpackConfig.output.publicPath,
	serverSideRender: false
    });
    
    app.use(middleware);
    app.get('*', function (req, res) {
	res.write(middleware.fileSystem.readFileSync(path.join(process.cwd(), 'dist', 'index.html')));
	res.end();
    });
} else {
    app.use('/dist', express.static('./dist'));
    app.get('*', function (req, res) {
	res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    });
}

app.listen(config.PORT, config.ADDRESS, function () {
    console.log('Listening on port ' + config.PORT.toString());
});
