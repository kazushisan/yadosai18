const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');

gulp.task('sass', function(){
    gulp.src('src/**/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/'));
});

gulp.task('imagemin', function(){
    gulp.src('src/**/*.+(jpg|jpeg|png|gif)')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('build/'));
})
gulp.task('copy', function(){
    gulp.src(['src/**/*',
                '!src/**/*.+(jpg|jpeg|png|gif|scss)'
             ])
    .pipe(plumber())
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', ['sass', 'imagemin', 'copy'], function () {
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.+(jpg|jpeg|png|gif)', ['imagemin']);
    gulp.watch(['src/**/*',
                '!src/**/*.+(jpg|jpeg|png|gif|scss)'
             ], ['copy']);
});