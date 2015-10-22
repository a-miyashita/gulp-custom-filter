"use strict";

var through = require('through2');
var gutil = require('gulp-util');

function filter(fn) {
	assertFunction(fn);
	return through.obj(function(file, encode, done) {
		if (fn(file, encode)) {
			this.push(file);
		}
		done();
	});
}

function assertFunction(fn, name) {
	if (!fn || typeof fn !== 'function') {
		throw new gutil.PluginError('gulp-custom-filter' + (name ? '.' + name : ''),
				'filter must be a function');
	}
}

filter.all = function() {
	return function() {
		return true;
	};
};

filter.none = function() {
	return function() {
		return false;
	};
};

filter.not = function(fn) {
	assertFunction(fn, 'not');
	return function(file, encode) {
		return !fn(file, encode);
	};
};

filter.and = function() {
	var filters = arguments;
	return function(file, encode) {
		return Array.prototype.every.call(filters, function (fn) {
			assertFunction(fn, 'and');
			return fn(file, encode);
		});
	};
};

filter.or = function() {
	var filters = arguments;
	return function(file, encode) {
		return Array.prototype.some.call(filters, function (fn) {
			assertFunction(fn, 'or');
			return fn(file, encode);
		});
	};
};

module.exports = filter;
