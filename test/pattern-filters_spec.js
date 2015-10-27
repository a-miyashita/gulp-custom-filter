'use strict';

var check = require('./test-util').checkFilter;
var filters = require('../lib/pattern-filters');
var fixture = require('./fixture.js');

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
		it('should pass files which equals to ignore file', function(done) {
			check(fixture.files, filters.ignore('a.js'), function(filenames) {
				expect(filenames).toEqual(['b.js', 'x.less', 'y.less']);
				done();
			});
		});

		it('should pass files which is contained by ignore list', function(done) {
			check(fixture.files, filters.ignore(['a.js', 'b.js']), function(filenames) {
				expect(filenames).toEqual(['x.less', 'y.less']);
				done();
			});
		});
	});
});
