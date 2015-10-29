'use strict';

var assertions = require('../lib/assertions');
var isFunction = assertions.isFunction;
var isString = assertions.isString;
var isStringOrArray = assertions.isStringOrArray;

describe('isFunction()', function() {
	it('should do nothing if the argument is a function', function() {
		expect(function() {
			isFunction(function() {}, 'test');
		}).not.toThrow();
	});

	it('should throw an error if the argument is not a function', function() {
		expect(function() {
			isFunction(null, 'test');
		}).toThrow();
		expect(function() {
			isFunction('dummy', 'test');
		}).toThrow();
		expect(function() {
			isFunction('dummy');
		}).toThrow();
	});
});

describe('isString()', function() {
	it('should do nothing if the argument is a string', function() {
		expect(function() {
			isString('string', 'test');
		}).not.toThrow();
	});

	it('should throw an error if the argument is not a string', function() {
		expect(function() {
			isString(null, 'test');
		}).toThrow();
		expect(function() {
			isString(function() {}, 'test');
		}).toThrow();
		expect(function() {
			isString(function() {});
		}).toThrow();
	});
});

describe('isStringOrArray()', function() {
	it('should do nothing if the argument is a string or an array', function() {
		expect(function() {
			isStringOrArray('string', 'test');
		}).not.toThrow();
		expect(function() {
			isStringOrArray(['string', 'string'], 'test');
		}).not.toThrow();
	});

	it('should throw an error if the argument is not a string nor an array', function() {
		expect(function() {
			isStringOrArray(null, 'test');
		}).toThrow();
		expect(function() {
			isStringOrArray(function() {}, 'test');
		}).toThrow();
		expect(function() {
			isStringOrArray(function() {});
		}).toThrow();
	});
});
