/**
 * Gulp
 * 
 * A ready to use Gulpfile for any project
 * 
 * Author: Riccardo Andreatta
 * 
 * Change the path variables to match your project structure:
 * 
 * 'pathHtml' this is the folder where there are all your HTML files,
 * 'pathViews' this is the root folder where there are all your views,
 * 'pathSass' this is the root folder where there are all your SASS files,
 * 'pathJs' this is the root folder where there are all your JavaScript files,
 * 'jsLibs' this is the folder where there are all your JavaScripts libraries (they are not linted and concatenated before the other JS files),
 * 'distCssPath' this is the folder where you want the built CSS file be put,
 * 'distCssFile' and this is the name of the built CSS file,
 * 'distJsPath' this is the folder where you want the built JS file be put,
 * 'distJsFile' and this is the name of the built JS file.
 * 
 * Note: Running Gulp with the suffix '--type production' also minify the distCssFile and uglify the distJsFile
 * 
 */

'use strict';

// Gulp configuration
var pathHtml = '/',
    pathViews = 'views/',
    pathSass = 'src/sass/',
    pathJs = 'src/js/',
    jsLibs = 'src/js/libs/',
    distCssPath = 'dist/css/',
    distCssFile = 'app.css',
    distJsPath = 'dist/js/',
    distJsFile = 'app.min.js';

/*** You should leave the remaining part as it is ***/

// Include gulp and plugins
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    del = require('del'),
    sass = require('gulp-sass'),
    csslint = require('gulp-csslint'),
    minifycss = require('gulp-minify-css'),
    htmlhint = require('gulp-htmlhint'),
//    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify');

// Remove all files and directories in the distribution folder
gulp.task('clean', function() {
    gutil.log('Gulp is deleting the files inside folders:\n', distCssPath, '\n', distJsPath);
    return del([distCssPath, distJsPath]);
});

// Compile Sass
gulp.task('sass', function() {
    gutil.log('Compiling SASS');
    return gulp.src(pathSass + '*.scss')
        .pipe(sourcemaps.init()) // Process the original sources
            .pipe(sass())
            .on('error', function (error) {
                gutil.beep();
                gutil.log(gutil.colors.red("ERROR", 'sass'), error);
                this.emit('end', new gutil.PluginError('sass', error, { showStack: true }));
            })
            .pipe(concat(distCssFile))
            // Only minify if Gulp is ran with '--type production'
            .pipe(gutil.env.type === 'production' ? minifycss() : gutil.noop())
        .pipe(sourcemaps.write()) // Add the map to modified source
        .pipe(gulp.dest(distCssPath))
        .pipe(livereload());
});

// Validate HTML
gulp.task('html', function() {
    gutil.log('Gulp is validating the HTML...');
    return gulp.src([pathHtml + '*.html', pathViews + '*.html', pathViews + '**/*.html'])
        .pipe(htmlhint({'doctype-first': false}))
        .pipe(htmlhint.reporter('htmlhint-stylish'));
});

// Validate CSS
gulp.task('css', ['sass'], function() {
    gutil.log('Gulp is validating the CSS...');
    return gulp.src([distCssPath + distCssFile])
        .pipe(csslint({
            'order-alphabetical': false,
            'outline-none': false,
            'box-sizing': false
        }))
        .pipe(csslint.formatter());
});

// Validate JS
gulp.task('js', function() {
    gutil.log('Gulp is validating the JavaScripts...');
    return gulp.src([pathJs + '*.js', pathJs + '**/*.js', '!' + jsLibs + '*.*'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Lint Task
gulp.task('lint', ['html', 'css', 'js'], function() {
    return;
});

// Concatenate & Minify JS
gulp.task('scripts', ['js'], function() {
    gutil.log('Gulp is concatenating and minifying the JavaScripts');
    return gulp.src([jsLibs + 'angular.js', jsLibs + '*.js', pathJs + '*.js', pathJs + '**/*.js'])
        .pipe(sourcemaps.init()) // Process the original sources
            .pipe(concat(distJsFile))
//            .pipe(rename(distJsFile))
            // only uglify if gulp is ran with '--type production'
            .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
            .on('error', function (error, fileName, cause) {
                gutil.beep();
                gutil.log('ERROR: ' + fileName + '\n' + error + '\n' + cause);
            })
        .pipe(sourcemaps.write()) // Add the map to modified source
        .pipe(gulp.dest(distJsPath))
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', ['css', 'scripts'], function() {
    livereload.listen();
    gulp.watch([pathJs + '*.js', pathJs + '**/*.js'], ['scripts'])
    .on('change', function(event) {
        gutil.log('File ' + event.path + ' was ' + event.type);
        gutil.log('===============');
        gutil.log('| Building... |');
        gutil.log('===============');
    });
    gulp.watch([pathSass + '*.*', pathSass + '**/*.*'], ['sass'])
    .on('change', function(event) {
        gutil.log('File ' + event.path + ' was ' + event.type);
        gutil.log('===============');
        gutil.log('| Building... |');
        gutil.log('===============');
    });
    gutil.log('===========================');
    gutil.log('| Gulp is now watching... |');
    gutil.log('===========================');
});

// Default Task
gulp.task('default', ['clean'], function() {
    gutil.log('===========================');
    gutil.log('| Gulp is now building... |');
    gutil.log('===========================');
    gulp.start('sass', 'scripts');
//    return gutil.log('Gulp is running the default task')
});