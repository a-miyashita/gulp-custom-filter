'use strict';

var check = require('./test-util').checkFilter;
var filters = require('../lib/pattern-filters');
var fixture = require('./fixture.js');
var fs = require('fs');
var tempfile = require('tempfile');

describe('pattern filters', function() {
	describe('glob()', function() {
		it('should filter with glob pattern', function(done) {
			check(fixture.files, filters.glob('*.js'), function(filenames) {
				expect(filenames).toEqual(['a.js', 'b.js']);
				done();
			});
		});

		it('should throw an error if the pattern is invalid', function() {
			expect(function() {
				filters.glob(null);
			}).toThrow();
		});
	});

	describe('ignore()', function() {
		var ignoreFile;

		beforeEach(function(done) {
			ignoreFile = tempfile('.myignore');
			fs.writeFile(ignoreFile, '*.js\n!b.js', done);
		});

		afterEach(function(done) {
			fs.unlink(ignoreFile, done);
		});

		it('should pass files which equals to ignore file, if file is succesfully loaded', function (done) {
			check(fixture.files, filters.ignore(ignoreFile), function (filenames) {
				expect(filenames).toEqual(['b.js', 'x.less', 'y.less']);
				done();
			});
		});

		it('should result in an error, if file is failed to be loaded', function (done) {
			var ignore;
			check(fixture.files, ignore = filters.ignore('<<enoent>>'), function (_) {
				fail();
				done();
			}, function() {
				ignore('A', undefined, function(err, result) {
					expect(err).toBeTruthy();
					done();
				});
			});
		});
	});
});
