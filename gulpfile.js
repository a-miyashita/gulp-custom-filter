var coveralls = require('gulp-coveralls');
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var istanbul = require('gulp-istanbul');

gulp.task('test', ['test:pre'], function() {
	return gulp.src('./test/**/*_spec.js')
			.pipe(jasmine())
			.pipe(istanbul.writeReports())
			.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('test:pre', function() {
	return gulp.src(['./index.js', './lib/**/*.js'])
			.pipe(istanbul())
			.pipe(istanbul.hookRequire());
});

gulp.task('coveralls', function() {
	return gulp.src('./coverage/**/lcov.info')
			.pipe(coveralls());
});
