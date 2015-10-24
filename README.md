# gulp-custom-filter
[![Build Status](https://secure.travis-ci.org/a-miyashita/gulp-custom-filter.png?branch=master)](http://travis-ci.org/a-miyashita/gulp-custom-filter)

A gulp plugin to filter files by customized filters.

## Install

```bash
$ npm install --save-dev gulp-custom-filter
```

## Usage

```javascript
var filter = require('gulp-custom-filter');
var gulp = require('gulp');
var less = require('gulp-less');

function myFilter(file) {
	return file.basename.startsWith('my_');
}

gulp.task('less', function() {
	return gulp.src('./less/**/*.less')
		.pipe(filter(myFilter))
		.pipe(less())
		.pipe(gulp.dest('./css')
});
```

This is equivalent to:

```javascript
var filter = require('gulp-custom-filter');
var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function() {
	return gulp.src('./less/**/my_*.less')
		.pipe(less())
		.pipe(gulp.dest('./css')
});
```

You may set any predicate function to a vinyl file.

### Utility filters

#### filter.not(fn)

Nagates filter conditions

```javascript
var not = filter.not;

gulp.src('./less/**/*.less')
	.pipe(filter(not(myFilter)) // will pass files which not satisfy myFilter
```	

This filter passes less files which its name does not start with 'my_'.

#### filter.and(fn1, fn2, ...)

Passes files which satisfy every filter conditions.

```javascript
var and = filter.and;

gulp.src('./less/**/*.less')
	.pipe(filter(and(myFilter1, myFilter2)) // will pass files which satisfy myFilter1 and myFilter2
```	

#### filter.or(fn1, fn2, ...)

Passes files which satisfy at least one of the filter conditions.

```javascript
var or = filter.or;

gulp.src('./less/**/*.less')
	.pipe(filter(or(myFilter1, myFilter2)) // will pass files which satisfy myFilter1 or myFilter2
```	

#### filter.all()

Passes every files. This is equivalent `function() { return true; }`

```javascript
var all = filter.all;

gulp.src('./less/**/*.less')
	.pipe(filter(all())) // no file will be filtered out.
```	

#### filter.none()

Passes no file. This is equivalent `function() { return false; }`

```javascript
var none = filter.none;

gulp.src('./less/**/*.less')
	.pipe(filter(none())) // no file will be passed.
```	


## License

* MIT License
	* see LICENSE
