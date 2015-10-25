'use strict';

var check = require('./test-util').checkFilter;
var fixture = require('./fixture.js');

describe('filter()', function() {
	it('should filter files with a sync filter', function(done) {
		check(fixture.files, fixture.filters.javascript, function(filenames) {
			expect(filenames).toEqual(['a.js', 'b.js']);
			done();
		});
	});

	it('should filter files with an async filter', function(done) {
		check(fixture.files, fixture.filters.asyncJavascript, function(filenames) {
			expect(filenames).toEqual(['a.js', 'b.js']);
			done();
		});
	});

	it('should fail if an filter throws an error', function(done) {
		check(fixture.files, fixture.filters.throwError, function(_) {
			fail();
			done();
		}, function() {
			done();
		});
	});

	it('should fail if an async filter returns a rejected promise', function(done) {
		check(fixture.files, fixture.filters.asyncThrowError, function(_) {
			fail();
			done();
		}, function() {
			done();
		});
	});
});
