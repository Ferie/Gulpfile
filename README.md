# A Gulpfile for any use

In this repository you can find a "ready to use" Gulpfile that can be used in any project.

## Usage

Simply install the necessary node modules (using ***npm*** or ***yarn***, as you wish) and that's it.

All you have to do now is to update your personal paths and built files in the initial variables (top of the file):

- ***pathSass*** is the path where there are your source SASS files

- ***pathJs*** is the path where there are your source JavaScript files

- ***pathJsLibs*** is the path where there are your source JavaScript libraries (or frameworks, or vendors, or whatever)

- ***distCssPath*** is the path where the built CSS file will be delivered

- ***distJsPath*** is the path where the built JavaScript file will be delivered

- ***distCssFile*** is the name of the built CSS file

- ***distJsFile*** is the name of the built JavaScript file

**Note**: If you change the paths, remember to add the "/" (slash) at the end of them!!!

## The plugins used by this Gulpfile

**Note**: Keep them up to date so the Gulpfile can works at its best performances.

- ***gulp-concat***: concat the file that are passed to a single gulp task (https://www.npmjs.com/package/gulp-concat).

- ***jshint*** and ***gulp-jshint***: a linter for your JavaScript files (https://www.npmjs.com/package/jshint).

- ***jshint-stylish***: this plugins is a stylish reporter for **jshint**, you can use the ***default*** one if you prefer  (https://www.npmjs.com/package/jshint-stylish).

- ***gulp-sourcemaps***: a very useful plugins that track the built files for your debugs (https://www.npmjs.com/package/gulp-sourcemaps).

- ***uglify-js*** and ***gulp-uglify***: plugin that minimizes the JavaScript files (https://www.npmjs.com/package/gulp-uglify).

- ***gulp-rename***: a useful plugin only if you have to rename the distribution files (https://www.npmjs.com/package/gulp-rename).

- ***del***: used in the **clean** task to remove any previous built files (https://www.npmjs.com/package/del).

