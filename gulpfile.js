'use strict';

const {src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const minify = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

function compileSass(done) {
  src('app/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('app/css'));
  done();
}

function cleanCss(done) {
  src('app/css/*.css')
  .pipe(minify())
  .pipe(dest('app/css/dist'))
  .pipe(browserSync.stream());
  done();
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./app"
    }
  });

  watch('app/sass/*.scss', compileSass);
  watch('app/css/*.css', cleanCss);
  watch('app/**/*.html').on('change', browserSync.reload);
}

  exports.default = series(serve);
