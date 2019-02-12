var coveralls = require('@kollavarsham/gulp-coveralls');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var istanbul = require('gulp-istanbul');

gulp.task('test:pre', () =>
	gulp.src(['./index.js', './lib/**/*.js'])
		.pipe(istanbul())
		.pipe(istanbul.hookRequire())
);

gulp.task('test', gulp.series('test:pre', () =>
	gulp.src('./test/**/*_spec.js')
		.pipe(jasmine())
		.pipe(istanbul.writeReports())
		.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
));

gulp.task('coveralls', () =>
	gulp.src('./coverage/**/lcov.info')
		.pipe(coveralls())
);

gulp.task('lint', () =>
	gulp.src(['index.js', './lib'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError())
);

exports.default = gulp.parallel('lint', 'test');
