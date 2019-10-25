/**
 * Gulpfile ready to use
 * 
 * Author: Riccardo Andreatta
 * 
 * Variables for configuration:
 * `port` port available for the localhost,
 * `pathHtml` this is the path to the folder where there are all the HTML files,
 * `pathSass` this is the path to the folder where there are all the SASS files,
 * `pathJs` this is the path to the folder where there are all the JavaScript files,
 * `jsLibs` this is the path to the folder where eventually there are JavaScripts libraries
 *      (they are not linted but they are concatenated before the other JS files),
 * `distCssPath` this is the path to the folder where you want the distribution CSS file,
 * `distCssFile` and this is the name of the built CSS file,
 * `distJsPath`  this is the path to the folder where you want the distribution JavaScript file,
 * `distJsFile` and this is the name of the built JavaScript file.
 */

'use strict';

/****************************************************/
/*** GULP CONFIGURATION                           ***/
/****************************************************/

var port = '9050',
    pathHtml = 'app/',
    pathSass = 'assets/sass/',
    pathJs = 'app/js',
    jsLibs = 'assets/js/libs/',
    distPath = 'dist/',
    distCssPath = 'dist/css/',
    distCssFile = 'app.min.css',
    distJsPath = 'dist/js/',
    distJsFile = 'app.min.js';

/****************************************************/
/*** You should leave the remaining part as it is ***/
/****************************************************/

var env = process.env.NODE_ENV || 'development';

// Require Gulp and other plugins
var gulp = require('gulp'),
    debug = require('gulp-debug')
    crashSound = require('gulp-crash-sound')
    noop = require("gulp-noop"),
    color = require("gulp-color"),
    connect = require('gulp-connect'),
    modRewrite = require('connect-modrewrite'),
    del = require('del'),
    sass = require('gulp-sass'),
    csslint = require('gulp-csslint'),
    cssmin = require('gulp-cssmin'),
    htmlhint = require('gulp-htmlhint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify');

var handleError = function (error) {
    crashSound.play();
    debug(color('ERROR: ' + error, 'RED'));
    this.emit('end');
};

// Remove all file in distribution folder
gulp.task('clean', function() {
    debug('Gulp is deleting the files inside folders:\n', distCssPath, '\n', distJsPath);
    return del([distCssPath, distJsPath]);
});

// Validate HTML
gulp.task('html', function() {
    debug('Gulp is validating the HTML...');
    return gulp.src([pathHtml + '*.html', pathHtml + '**/*.html'])
        .pipe(htmlhint({'doctype-first': false}))
        .pipe(htmlhint.reporter('htmlhint-stylish'));
});

// Compile Sass & Minify CSS
gulp.task('sass', function() {
    debug('Gulp is compiling the SASS');
    return gulp.src(pathSass + '*.scss')
        .pipe(sourcemaps.init()) // Process the original sources
            .pipe(sass())
            .on('error', handleError)
            .pipe(concat(distCssFile))
            .on('error', handleError)
            .pipe(gulpif(env === 'production', cssmin()))
            .on('error', handleError)
        .pipe(sourcemaps.write()) // Add the map to modified source
        .pipe(gulp.dest(distCssPath))
        .pipe(connect.reload());
});

// Validate CSS
gulp.task('css', ['sass'], function() {
    debug('Gulp is validating the CSS...');
    return gulp.src([distCssPath + distCssFile])
        .pipe(csslint({
            'order-alphabetical': false,
            'outline-none': false,
            'box-sizing': false,
            'adjoining-classes': false
        }))
        .pipe(csslint.formatter());
});

// Validate JS
gulp.task('js', function() {
    debug('Gulp is validating the JavaScripts...');
    return gulp.src([pathJs + '*.js', pathJs + '**/*.js', '!' + jsLibs + '*.*'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Concatenate & Minify JS
gulp.task('scripts', ['js'], function() {
    debug('Gulp is concatenating the JavaScripts');
    return gulp.src([jsLibs + 'angular.js', jsLibs + '*.js', pathJs + '*.js', pathJs + '**/*.js'])
        .pipe(sourcemaps.init()) // Process the original sources
            .pipe(concat(distJsFile))
            .on('error', handleError)
            .pipe(gulpif(env === 'production', uglify({
                mangle: false
            })))
            .on('error', handleError)
        .pipe(sourcemaps.write()) // Add the map to modified source
        .pipe(gulp.dest(distJsPath))
        .pipe(connect.reload());
});

// Lint Task
gulp.task('lint', ['html', 'css', 'js'], function() {
    return;
});

// Server Task with Livereload
gulp.task('server', ['watch'], function () {
    connect.server({
        root: __dirname,
        livereload: true,
//        livereload.port: 35729,
        fallback: 'app/index.html',
        port: process.env.PORT || port,
        host: 'localhost',
        middleware: function () {
            return [
                modRewrite([
                    '^/api/(.*)$ http://localhost:' + port + '/api/v1/$1 [P]'
                ])
            ];
        }
    });
});

// Watch Task
gulp.task('watch', ['css', 'scripts'], function() {
    gulp.watch([pathHtml + '*.html', pathHtml + '**/*.html'], ['html'])
    .on('change', function(event) {
        gutil.log('File ' + event.path + ' was ' + event.type);
        gutil.log('===============');
        gutil.log('| Building... |');
        gutil.log('===============');
    });
    gulp.watch([pathJs + '*.js', pathJs + '**/*.js'], ['scripts'])
    .on('change', function(event) {
        debug('File ' + event.path + ' was ' + event.type);
        debug('===============');
        debug('| Building... |');
        debug('===============');
    });
    gulp.watch([pathSass + '*.*', pathSass + '**/*.*'], ['sass'])
    .on('change', function(event) {
        debug('File ' + event.path + ' was ' + event.type);
        debug('===============');
        debug('| Building... |');
        debug('===============');
    });
    debug('===========================');
    debug('| Gulp is now watching... |');
    debug('===========================');
});

// Default Task
gulp.task('default', ['clean'], function() {
    debug('===========================');
    debug('| Gulp is now building... |');
    debug('===========================');
    gulp.start('html', 'css', 'scripts');
});

/****************************************************
 * AUTO GENERATED DOCUMENTATION TASK                *
 *                                                  *
 * Creates automated documentation via the specific *
 * comments throughout the js code.                 *
 ****************************************************/

var jsdoc = require('gulp-jsdoc3');

gulp.task('jsDoc', function (cb) {
    gulp.src(
        [
            'README.md',
            pathJs + '*.js',
            pathJs + '**/*.js',
            '!' + jsLibs + '*.*'
        ],
        {
            read: false
        }
    )
    .pipe(jsdoc(cb));
});

/****************************************************/
/* ADD HEADER TO MINIMIZED FILES                    */
/****************************************************/

var header = require('gulp-header');
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('package.json'));
var opts = {
    banner: [
        '/**',
        ' * <%= description %> - <%= homepage %>',
        ' * Version - <%= version %>',
        ' * Licensed under the <%= license.name %> license - <%= license.link %>',
        ' *',
        ' * Copyright (c) <%= new Date().getFullYear() %> <%= author.company %>',
        ' */\n\n'
    ].join('\n')
};

/****************************************************/
/* HEROKU ENVIRONMENT TASKS                         */
/****************************************************/

// Compile Sass & Minify CSS for Heroku environment
gulp.task('heroku:styles', function () {
    gutil.log('Gulp is compiling the SASS and concatenating and minifying the CSS');
    return gulp.src(pathSass + '*.scss')
        .pipe(sass())
        .pipe(concat(distCssFile))
        .pipe(cssmin())
        .pipe(header(opts.banner, pkg))
        .pipe(gulp.dest(distCssPath));
});

// Concatenate & Minify JS for Heroku environment
gulp.task('heroku:scripts', function () {
    gutil.log('Gulp is concatenating and minifying the JavaScripts');
    return gulp.src([
            jsLibs + '*.js',
            pathJs + '*.js',
            pathJs + '**/*.js'
        ])
        .pipe(concat(distJsFile))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(header(opts.banner, pkg))
        .pipe(gulp.dest(distJsPath));
});

// Default Heroku Task
gulp.task('heroku:default', ['clean'], function () {
    gutil.log('===========================');
    gutil.log('| Gulp is now building... |');
    gutil.log('===========================');
    gulp.start('heroku:styles', 'heroku:scripts');
});
