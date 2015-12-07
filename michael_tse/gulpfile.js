var gulp = require('gulp');
var gulpWatch = require('gulp-watch');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var appFiles = ['server.js', 'lib/**/*.js'];
var testFiles = ['./test/**/*.js'];
var webpack = require('webpack-stream');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');

gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('css:dev', function() {
  return gulp.src([
    'app/css/reset.css',
    'app/css/base.css',
    'app/css/layout.css',
    'app/css/module.css',
    'app/css/state.css',])
  .pipe(concatCss('styles.min.css'))
  .pipe(minifyCss())
  .pipe(gulp.dest('build/'));
});

gulp.task('css:watch', function () {
  gulp.watch('./app/css/**/*.css', ['css:dev']);
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

gulp.task('watch', ['css:watch']);

gulp.task('jshint', ['jshint:test', 'jshint:app']);
gulp.task('default', ['jshint', 'mocha']);
gulp.task('build:dev', ['webpack:dev', 'static:dev', 'css:dev']);
gulp.task('default', ['build:dev']);
