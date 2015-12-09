var gulp = require('gulp');
var gulpWatch = require('gulp-watch');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var appFiles = ['server.js', 'lib/**/*.js'];
var testFiles = ['./test/**/*.js'];
var webpack = require('webpack-stream');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass')
var maps = require('gulp-sourcemaps');

gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('sass:dev', function() {
  gulp.src('./app/sass/**/*.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('build/'));
});

gulp.task('sass:watch', function () {
  gulp.watch(['./app/sass/**/*.scss', './app/index.html'], ['sass:dev', 'static:dev']);
});

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
  return gulp.src('test/client/test_entry.js')
  .pipe(webpack({
    output: {
      filename: 'test_bundle.js'
    }
  }))
  .pipe(gulp.dest('test/client/'));
});

gulp.task('jshint:test', function(){
  return gulp.src(testFiles)
  .pipe(jshint({
    node:true,
    globals: {
      describe: true,
      it: true,
      before: true,
      beforeEach: true,
      after: true
    }
  }))
  .pipe(jshint.reporter('default'));
});

gulp.task('jshint:app', function(){
  return gulp.src(appFiles)
  .pipe(jshint.reporter('default'));
});

gulp.task('mocha', ['jshint'], function(){
  return gulp.src('./test/player_test.js', {read:false})
  .pipe(mocha({reporter:'spec'}));
});

gulp.task('watch', ['sass:watch']);

gulp.task('jshint', ['jshint:test', 'jshint:app']);
gulp.task('default', ['jshint', 'mocha']);
gulp.task('build:dev', ['webpack:dev', 'static:dev', 'sass:dev', 'webpack:test']);
gulp.task('default', ['build:dev']);
