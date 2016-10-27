const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const webpackConfig = require('./webpack.config');


gulp.task('index', function() {
    return gulp.src('./src/static/index.html')
        .pipe(gulp.dest('./dist'));
});


gulp.task('images', function() {
    return gulp.src('./src/static/img/**/*.{png,gif,jpg,jpeg}')
        .pipe(gulp.dest('./dist/img'));
})


gulp.task('favicon', function() {
    return gulp.src('./src/static/favicon.ico')
        .pipe(gulp.dest('./dist/'));
})


gulp.task('js-css', function() {
    return gulp.src('./src/app.js')
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('./dist'));
});


gulp.task('build', ['index', 'images', 'favicon', 'js-css'], function() {});

