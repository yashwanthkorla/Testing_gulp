var gulp = require('gulp');
var browsersync = require('browser-sync').create();
var sass  = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemap = require('gulp-sourcemaps');
var image = require('gulp-imagemin');

gulp.task('default',['copy-html','styles'],() => {
    gulp.watch('disc/index.html').on('change',browsersync.reload)
    browsersync.init({
        server : 'disc/'
    })
})

gulp.task('copy-html', () => {
    gulp.src('index.html')
    .pipe(gulp.dest('disc'))
})

gulp.task('styles',() => {
    gulp.src('sass/**/*.scss')
    .pipe(concat('main.css'))
    .pipe(sass({
        outputStyle : 'compressed'
    }).on('error',sass.logError))
    .pipe(gulp.dest('disc/css'))
})

gulp.task('minify-js', () => {
    gulp.src('main.js')
    .pipe(sourcemap.init())
    .pipe(uglify())
    .pipe(sourcemap.write('../sourcemap'))
    .pipe(gulp.dest('disc'))
});

gulp.task('imagemin',() => {
    gulp.src('images/**/*')
    .pipe(image())
    .pipe(gulp.dest('disc/images'))
})
    