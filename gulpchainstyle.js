const gulp = require('gulp')
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const rename = require('gulp-rename')
const debug = require('gulp-debug')

module.exports = function stylechain(src) {
  return gulp
    .src(src, { dot: true })
    .pipe(plumber())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(autoprefixer({
      browsers: [
        "last 2 versions",
        "iOS >= 8"
      ],
      flexbox: true,
      cascade: true
    }))
    .pipe(gulp.dest(function(file) {
      return file.base
    }))
    .pipe(csso())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(function(file) {
      return file.base
    }))
};
