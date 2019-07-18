const gulp = require("gulp");
const run = require("run-sequence");
const chainstyle = require("./gulpchainstyle");
const chainscripts = require("./gulpchainscripts");
const chainsprite = require("./gulpchainsprite");

gulp.task("script:templates", function() {
  return chainscripts([
    "./public/local/templates/**/*.js",
    "!./public/local/templates/**/*.min.js",
    "./public/local/templates/check-face-vue/js/vendor/**/*.js"
  ]);
});

gulp.task("style:templates", function() {
  return chainstyle(["./public/local/templates/**/*.scss"]);
});

// для сборки спрайтов

gulp.task("sprite:assets", function() {
  return chainsprite(["./public/assets/images/icon/*.svg"]);
});

gulp.task("build", function(done) {
  run("script:templates", "style:templates", "sprite:assets", done);
});

gulp.task("watch", function() {
  run("script:templates", "style:templates", "sprite:assets");

  gulp.watch(
    [
      "./public/local/templates/**/*.js",
      "!./public/local/templates/**/*.min.js",
      "!./public/local/templates/check-face-vue/js/vendor/**/*.js"
    ],
    ["script:templates"]
  );
  gulp.watch("./public/local/templates/**/*.scss", ["style:templates"]);
  gulp.watch("./public/assets/images/icon/*.svg", ["sprite:assets"]);
});
