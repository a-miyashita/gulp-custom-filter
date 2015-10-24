'use strict';

var Buffer = require('buffer').Buffer;
var filter = require('./');
var gutil = require('gulp-util');
var path = require('path');

describe('filter()', function() {
	var files = [
		new gutil.File({
			base: __dirname,
			path: path.join(__dirname, 'a.js'),
			contents: new Buffer('var a = 10;')
		}),
		new gutil.File({
			base: __dirname,
			path: path.join(__dirname, 'b.js')
		}),
		new gutil.File({
			base: __dirname,
			path: path.join(__dirname, 'x.less'),
			contents: new Buffer('* { color: black; }')
		}),
		new gutil.File({
			base: __dirname,
			path: path.join(__dirname, 'y.less')
		})
	];

	function buffer(file) {
		return file.isBuffer();
	}

	function javascript(file) {
		var filename = file.basename;
		return filename.length > 3 && filename.indexOf('.js') >= 0;
	}

	function check(targetFilter, assertion) {
		var filtered = [];
		var stream = filter(targetFilter);

		stream.on('data', function (file) {
			filtered.push(file);
		});
		stream.on('end', function() {
			assertion(filtered.map(function(file) { return file.basename; }));
		});
		files.forEach(function(file) {
			stream.write(file);
		});
		stream.end();
	}

	it('should filter files', function(done) {
		check(javascript, function(filenames) {
			expect(filenames).toEqual(['a.js', 'b.js']);
			done();
		});
	});

	describe('filter.not()', function() {
		it('should negate filter condition', function(done) {
			check(filter.not(javascript), function(filenames) {
				expect(filenames).toEqual(['x.less', 'y.less']);
				done();
			});
		});
	});

	describe('filter.and()', function() {
		it('should pass files which both of two filters passes', function(done) {
			check(filter.and(javascript, buffer), function(filenames) {
				expect(filenames).toEqual(['a.js']);
				done();
			});
		});
	});

	describe('filter.or()', function() {
		it('should pass files which either of two filters passes', function(done) {
			check(filter.or(javascript, buffer), function(filenames) {
				expect(filenames).toEqual(['a.js', 'b.js', 'x.less']);
				done();
			});
		});
	});

	describe('filter.all()', function() {
		it('should pass every files', function(done) {
			check(filter.all(), function(filenames) {
				expect(filenames).toEqual(['a.js', 'b.js', 'x.less', 'y.less']);
				done();
			});
		});
	});

	describe('filter.none()', function() {
		it('should not pass any file', function(done) {
			check(filter.none(), function(filenames) {
				expect(filenames).toEqual([]);
				done();
			});
		});
	});
});
