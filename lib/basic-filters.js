'use strict';

var assertIsFunction = require('./assertions').isFunction;

function not(fn) {
	assertIsFunction(fn, 'not', 'fn');
	return function(file, encode) {
		return !fn(file, encode);
	};
}

function and() {
	var filters = arguments;
	return function(file, encode) {
		return Array.prototype.every.call(filters, function (fn) {
			assertIsFunction(fn, 'and', 'filters');
			return fn(file, encode);
		});
	};
}

function or() {
	var filters = arguments;
	return function(file, encode) {
		return Array.prototype.some.call(filters, function (fn) {
			assertIsFunction(fn, 'or', 'filters');
			return fn(file, encode);
		});
	};
}

function all() {
	return function() {
		return true;
	};
}

function none() {
	return function() {
		return false;
	};
}

module.exports = {
	not: not,
	and: and,
	or: or,
	all: all,
	none: none
};
