# A Gulpfile for any use

In this repository you can find a "ready to use" Gulpfile that can be used in any project.

## Installation

All the necessary plugins are in the `package.json` so it is easier to install them via package manager.

Once you have put the `Gulpfile.js` in your project main directory, install the necessary plugins using a package manager (`npm`, `yarn`, `bower`, etc... as you wish) and that's it: you are now ready to use Gulp.

## Configuration

All you have to do now is to update your personal paths in the initial variables (at the top of the file):

- ***pathHtml*** is the path where there are all your main HTML files

- ***pathViews*** is the path where there are all your HTML views if you are using a framework

- ***pathSass*** is the path where there are your source SASS files (all the sub-folders are scanned as well for changes)

- ***pathJs*** is the path where there are your source JavaScript files (all the sub-folders are scanned as well for changes

- ***pathJsLibs*** is the path where there are your source JavaScript libraries (or frameworks, or vendors, or whatever)

- ***distCssPath*** is the path where the built CSS file will be placed

- ***distCssFile*** is the name of the built/minified CSS file

- ***distJsPath*** is the path where the built JavaScript file will be placed

- ***distJsFile*** is the name of the built/minified JavaScript file

**Note**: If you change the paths, remember to add the "/" (slash) at the end of them!

## Run Gulp

In the terminal command line simply run:

```
gulp
```

You can also run both the compiler/builder and the watcher at the same time:

```
gulp && gulp watch
```

This Gulpfile comes with the option to also minify your built files (styles and scripts) for production environments:

```
gulp --type production
```

## The plugins used by this Gulpfile

**Note**: Keep them up to date so the Gulpfile can works at its best performances.

- ***gulp***: this is the main plugin that runs Gulp, it is used for automation of time-consuming and repetitive tasks involved in web development like minification, concatenation, cache busting, unit testing, linting, optimization etc. (https://www.npmjs.com/package/gulp).

- ***gulp-util***: utility functions for gulp plugins (https://www.npmjs.com/package/gulp-util).

- ***del***: used in the **clean** task to remove any previous built files (https://www.npmjs.com/package/del).

- ***gulp-sass***: plugin that compiles the SASS files (https://www.npmjs.com/package/gulp-sass).

- ***gulp-csslint***: a linter plugin for the CSS distribution file (https://www.npmjs.com/package/gulp-csslint).

- ***gulp-clean-css***: a plugin to minify the CSS (https://www.npmjs.com/package/gulp-clean-css).

- ***gulp-htmlhint***: a linter plugin for the HTML files (https://www.npmjs.com/package/gulp-htmlhint).

- ***htmlhint-stylish***: a stylish plugin reporter for HTMLHint (https://www.npmjs.com/package/htmlhint-stylish).

- ***gulp-sourcemaps***: a very useful plugins that maps the built files for easy debugging (https://www.npmjs.com/package/gulp-sourcemaps).

- ***gulp-livereload***: it monitors the sources files and automatically compile them and reload the page as soon as the source code is saved (https://www.npmjs.com/package/gulp-livereload).

- ***gulp-concat***: concats the files that are passed in in a single one (https://www.npmjs.com/package/gulp-concat).

- ***gulp-jshint***: a linter plugin for the JavaScript files (https://www.npmjs.com/package/gulp-jshint).

- ***jshint-stylish***: a stylish plugin reporter for Gulp-JSHint (https://www.npmjs.com/package/jshint-stylish).

- ***gulp-uglify***: a plugin to minify the JavaScript files (https://www.npmjs.com/package/gulp-uglify).

- ***gulp-rename***: a plugin used only if you have to rename the distribution files: by default it is commented in the Gulpfile, so you have to uncomment the corresponding lines if you want to use it (https://www.npmjs.com/package/gulp-rename).

