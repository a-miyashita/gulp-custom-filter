'use strict';

var assertFunction = require('../lib/assert-function');

describe('assertFunction()', function() {
	it('should do nothing if the argument is a function', function() {
		expect(function() {
			assertFunction(function() {}, 'test');
		}).not.toThrow();
	});

	it('should throw an error if the argument is not a function', function() {
		expect(function() {
			assertFunction(null, 'test');
		}).toThrow();
		expect(function() {
			assertFunction('dummy', 'test');
		}).toThrow();
		expect(function() {
			assertFunction('dummy');
		}).toThrow();
	});
});
