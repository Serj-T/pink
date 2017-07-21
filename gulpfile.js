"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var precss = require("precss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

var gulpUsebem = require('gulp-usebem');
var gulpIf = require('gulp-if');
var gulpIgnore = require('gulp-ignore');

gulp.task('bem', function () {
  var bemAssets = gulpUsebem.assets({
    blockPaths: ['app/blocks'],
    exts: ['css']
  });
 
  return gulp.src('app/*.html')
    .pipe(bemAssets)
    // Add assets to pipe 
    // Save css files 
    .pipe(gulpIf(
      '*.css',
      gulp.dest('dist/styles/bem')
    ))
    // Exclude assets with default paths 
    .pipe(gulpIgnore.exclude('**/*'))
    // Restore app/*.html 
    .pipe(bemAssets.restore())
    // Replace markers in HTML 
    .pipe(gulpUsebem({
      cssCommentMarker: 'bem-css',
      cssBlockPath: 'styles/bem'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task("style", function() {
  gulp.src("postcss/style.css")
    .pipe(plumber())
    .pipe(postcss([
      precss(),
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ]))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("postcss/**/*.css", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});