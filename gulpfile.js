// Include gulp and plugins
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    del = require('del'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    uglifyjs = require('uglify-js'),
//    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    pathSass = 'sass/',
    pathJs = 'js/',
    distCss = 'dist/css/',
    distJs = 'dist/js/';

// Remove all file in distribution folder
gulp.task('clean', function() {
    console.log('[' + (new Date).toLocaleTimeString() + '] Deleting files inside folders:\n', distCss, '\n', distJs);
    return del([distCss, distJs]);
});

// Compile Sass
gulp.task('sass', function() {
    console.log('[' + (new Date).toLocaleTimeString() + '] Compiling SASS');
//    console.log((new Date).toUTCString() + ' Compiling SASS');
    return gulp.src(pathSass + '*.scss')
        .pipe(sourcemaps.init()) // Process the original sources
            .pipe(sass())
            .pipe(concat('app.css'))
        .pipe(sourcemaps.write()) // Add the map to modified source
        .pipe(gulp.dest(distCss));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src(pathJs + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Concatenate & Minify JS
gulp.task('scripts', ['lint'], function() {
    console.log('[' + (new Date).toLocaleTimeString() + '] Concatenating and Minifying JavaScripts');
    return gulp.src([pathJs + 'libs/*.js', pathJs + '*.js'])
        .pipe(sourcemaps.init()) // Process the original sources
            .pipe(concat('app.min.js'))
            .pipe(gulp.dest(distJs))
//            .pipe(rename('app.min.js'))
//            //only uglify if gulp is ran with '--type production'
//            .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
            .pipe(uglify())
        .pipe(sourcemaps.write()) // Add the map to modified source
        .pipe(gulp.dest(distJs));
});

// Watch Files For Changes
gulp.task('watch', ['clean'], function() {
    gulp.watch(pathJs + '*.js', ['lint', 'scripts']);
    gulp.watch(pathSass + '*.scss', ['sass']);
    console.log('===========================');
    console.log('| Gulp is now watching... |');
    console.log('===========================');
});

// Default Task
gulp.task('default', ['clean'], function() {
    console.log('===========================');
    console.log('| Gulp is now building... |');
    console.log('===========================');
    gulp.start('sass', 'scripts');
//    return gutil.log('Gulp is running the default task')
});