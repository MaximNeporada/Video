const gulp = require("gulp");
const plumber = require("gulp-plumber");
const svgstore = require("gulp-svgstore");
const rename = require("gulp-rename");

module.exports = function spritechain(src) {
  return gulp
    .src(src, { dot: true })
    .pipe(
      svgstore({
        inLineSvg: true
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("./public/assets/images/sprite/"));
};
