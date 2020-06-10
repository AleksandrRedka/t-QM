const gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  rename = require('gulp-rename'),
  babel = require('gulp-babel'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify');

gulp.task('sass', function () {
  return gulp
    .src('src/sass/**/*.sass')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
        cascade: false
     }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('html', function () {
  return gulp
    .src('src/*.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('script', function () {
  return gulp
    .src('src/js/*.js')
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({ stream: true }))
})


gulp.task('fonts', function (done) {
  gulp.src('src/fonts/*').pipe(gulp.dest('build/fonts'))
  done()
})

gulp.task('img', function (done) {
  gulp.src('src/img/*').pipe(gulp.dest('build/img'))
  done()
})


gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: 'build/'
    }
  })
})

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.sass', gulp.parallel('sass'))
  gulp.watch('src/*.html', gulp.parallel('html'))
  gulp.watch('src/js/*.js', gulp.parallel('script'))
})

gulp.task('default', gulp.parallel('sass', 'script', 'browser-sync', 'watch'))
gulp.task('build', gulp.parallel('html', 'sass', 'fonts', 'img', 'script'))
