'use strict';

var Promise = Promise || require('promise');
var assertIsFunction = require('./assertions').isFunction;
var promisenize = require('./promisenize');

function not(fn) {
	assertIsFunction(fn, 'not', 'fn');
	return function(file, encode) {
		return promisenize(fn)(file, encode)
				.then(function(isTarget) {
					return !isTarget;
				});
	};
}

function and() {
	var filters = Array.prototype.slice.call(arguments);
	return function(file, encode) {
		return Promise.all(filters.map(function(filter) {
			assertIsFunction(filter, 'and', 'filters');
			return promisenize(filter)(file, encode);
		}))
		.then(function(results) {
			return results.every(function(result) { return result; });
		});
	};
}

function or() {
	var filters = Array.prototype.slice.call(arguments);
	return function(file, encode) {
		return Promise.all(filters.map(function(filter) {
			assertIsFunction(filter, 'and', 'filters');
			return promisenize(filter)(file, encode);
		}))
		.then(function(results) {
			return results.some(function(result) { return result; });
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
