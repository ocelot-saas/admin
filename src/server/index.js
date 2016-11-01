const express = require('express');
const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');
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

    app.get('/dist/app.bundle.js', function (req, res) {
        const templateAppJsFile = middleware.fileSystem.readFileSync(path.join(process.cwd(), 'dist', 'app.bundle.js'), 'utf8');
        const appJsFile = Mustache.render(templateAppJsFile, config);
        res.write(appJsFile);
        res.end();
    });
    app.use(middleware);
    app.get('*', function (req, res) {
	res.write(middleware.fileSystem.readFileSync(path.join(process.cwd(), 'dist', 'index.html')));
	res.end();
    });
} else {
    const templateAppJsFile = fs.readFileSync(path.join(process.cwd(), 'dist', 'app.bundle.js'), 'utf8');
    const appJsFile = Mustache.render(templateAppJsFile, config);
    const indexFile = fs.readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
    app.get('/dist/app.bundle.js', function (req, res) {
        res.write(appJsFile);
        res.end();
    });
    app.use('/dist', express.static('./dist'));
    app.get('*', function (req, res) {
        res.write(indexFile);
        res.end();
    });
}

app.listen(config.PORT, config.ADDRESS, function () {
    console.log('Listening on port ' + config.PORT.toString());
});
