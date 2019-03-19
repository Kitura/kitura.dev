'use strict';

const {src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const minify = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

function compileSass(done) {
  src('sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('css'));
  done();
}

function cleanCss(done) {
  src('css/*.css')
  .pipe(minify())
  .pipe(dest('css/dist'))
  .pipe(browserSync.stream());
  done();
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  watch('sass/*.scss', compileSass);
  watch('css/*.css', cleanCss);
  watch('**/*.html').on('change', browserSync.reload);
}

  exports.default = series(serve);
