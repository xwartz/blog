var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var plumber = require('gulp-plumber')

var config = {
  style: './app/style',
  dest: './source/style'
}

gulp.task('sass', function () {
  return gulp.src(config.style + '/main.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.dest))
})

gulp.task('default', ['sass'], function () {
  gulp.watch(config.style + '/**/*.scss', ['sass'])
})
