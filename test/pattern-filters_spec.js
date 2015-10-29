'use strict';

var check = require('./test-util').checkFilter;
var filters = require('../lib/pattern-filters');
var fixture = require('./fixture.js');
var mock = require('mock-fs');

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
		beforeEach(function () {
			mock({
				'.myignore': '*.js\n!b.js'
			});
		});

		it('should pass files which equals to ignore file, if file is succesfully loaded', function (done) {
			check(fixture.files, filters.ignore('.myignore'), function (filenames) {
				expect(filenames).toEqual(['b.js', 'x.less', 'y.less']);
				done();
			});
		});

		it('should result in a empty filter, if file is failed to be loaded', function (done) {
			check(fixture.files, filters.ignore('<<enoent>>'), function (filenames) {
				expect(filenames).toEqual(['a.js', 'b.js', 'x.less', 'y.less']);
				done();
			});
		});

		afterEach(function() {
			mock.restore();
		});
	});
});
