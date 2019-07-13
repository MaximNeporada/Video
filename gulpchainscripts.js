const gulp = require('gulp')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const debug = require('gulp-debug')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
//const babel = require('gulp-babel')

module.exports = function stylechain(src) {
  return gulp
    .src(src, { dot: true })
    //.pipe(debug())
    .pipe(plumber())
    //.pipe(sourcemaps.init())
    //.pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    //.pipe(sourcemaps.write("."))
    .pipe(gulp.dest(function(file) {
      return file.base
    }))
}
