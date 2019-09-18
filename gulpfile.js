/**
 * Gulp
 * 
 * Author: Riccardo Andreatta
 * 
 * Path variables that match the project structure:
 * 
 * 'pathHtml' this is the folder where there are all your HTML files,
 * 'pathSass' this is the root folder where there are all your SASS files,
 * 'pathJs' this is the root folder where there are all your JavaScript files,
 * 'jsLibs' this is the folder where there are all your JavaScripts libraries (they are not linted and concatenated before the other JS files),
 * 'distCssPath' this is the folder where you want the built CSS file be put,
 * 'distCssFile' and this is the name of the built CSS file,
 * 'distJsPath' this is the folder where you want the built JS file be put,
 * 'distJsFile' and this is the name of the built JS file.
 * 
 * Note: Running Gulp with the suffix '--type production' it minifies the distCssFile and uglifies the distJsFile
 * 
 */

'use strict';

/****************************************************/
/* GULP CONFIGURATION                               */
/****************************************************/

var pathHtml = 'app/',
    pathSass = 'assets/sass/',
    pathJs = 'app/',
    jsLibs = 'assets/js/libs/',
    distPath = 'dist/',
    distCssPath = 'dist/css/',
    distCssFile = 'vida.min.css',
    distJsPath = 'dist/js/',
    distJsFile = 'vida.min.js';

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
        port: process.env.PORT || 9050,
        host: 'localhost',
        middleware: function () {
            return [
                modRewrite([
                    '^/api/(.*)$ http://localhost:9050/api/v1/$1 [P]'
                ])
            ];
        }
    });
});

// Watch Task
gulp.task('watch', ['css', 'scripts'], function() {
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
