// Include gulp and plugins
var pathSass = 'sass/',
    pathJs = 'js/',
    pathJsLibs = 'js/libs/',
    distCssPath = 'dist/css/',
    distCssFile = 'app.css',
    distJsPath = 'dist/js/',
    distJsFile = 'app.min.js',
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    del = require('del'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    uglifyjs = require('uglify-js'),
//    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps');

// Remove all file in distribution folders
gulp.task('clean', function() {
    console.log('[' + (new Date).toLocaleTimeString() + '] Deleting files inside folders:\n', distCssPath, '\n', distJsPath);
    return del([distCssPath, distJsPath]);
});

// Compile Sass
gulp.task('sass', function() {
    console.log('[' + (new Date).toLocaleTimeString() + '] Compiling SASS');
//    console.log((new Date).toUTCString() + ' Compiling SASS');
    return gulp.src(pathSass + '*.scss')
        .pipe(sourcemaps.init()) // Process the original sources
            .pipe(sass())
            .pipe(concat(distCssFile))
        .pipe(sourcemaps.write()) // Add the map to modified source
        .pipe(gulp.dest(distCssPath));
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
    return gulp.src([pathJsLibs + '*.js', pathJs + '*.js'])
        .pipe(sourcemaps.init()) // Process the original sources
            .pipe(concat(distJsFile))
            .pipe(gulp.dest(distJsPath))
//            .pipe(rename(distJsFile))
//            //only uglify if gulp is ran with '--type production'
//            .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
            .pipe(uglify())
        .pipe(sourcemaps.write()) // Add the map to modified source
        .pipe(gulp.dest(distJsPath));
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
});
