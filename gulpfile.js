var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');

var DEST = 'dist';

gulp.task('lint', function() {
    return gulp.src('src/app/**.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
})

gulp.task('html', ['lint'], function() {
    return gulp.src('src/app/**/*.html')
        .pipe(useref())
        .pipe(gulpif('underwriting.min.js', uglify()))
        .pipe(gulp.dest(DEST));
});

gulp.task('content', function() {
    return gulp.src('src/app/content/**')
        .pipe(gulp.dest(DEST + '/content'));
})

gulp.task('default', ['html', 'content']);
