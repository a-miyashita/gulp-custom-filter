'use strict';

var check = require('./test-util').checkFilter;
var filters = require('../lib/basic-filters');
var fixture = require('./fixture.js');

describe('basic filters', function() {
	describe('not()', function() {
		it('should negate filter condition', function(done) {
			check(fixture.files, filters.not(fixture.filters.javascript), function(filenames) {
				expect(filenames).toEqual(['x.less', 'y.less']);
				done();
			});
		});
	});

	describe('and()', function() {
		it('should pass files which both of two filters passes', function(done) {
			check(fixture.files, filters.and(fixture.filters.javascript, fixture.filters.buffer), function(filenames) {
				expect(filenames).toEqual(['a.js']);
				done();
			});
		});
	});

	describe('or()', function() {
		it('should pass files which either of two filters passes', function(done) {
			check(fixture.files, filters.or(fixture.filters.javascript, fixture.filters.buffer), function(filenames) {
				expect(filenames).toEqual(['a.js', 'b.js', 'x.less']);
				done();
			});
		});
	});

	describe('all()', function() {
		it('should pass every files', function(done) {
			check(fixture.files, filters.all(), function(filenames) {
				expect(filenames).toEqual(['a.js', 'b.js', 'x.less', 'y.less']);
				done();
			});
		});
	});

	describe('none()', function() {
		it('should not pass any file', function(done) {
			check(fixture.files, filters.none(), function(filenames) {
				expect(filenames).toEqual([]);
				done();
			});
		});
	});
});
