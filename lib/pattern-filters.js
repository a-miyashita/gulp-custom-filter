'use strict';

var Set = require('es6-set');
var assertIsString = require('./assertions').isString;
var assertIsStringOrArray = require('./assertions').isStringOrArray;
var fs = require('fs');
var gutil = require('gulp-util');
var ig = require('ignore');
var minimatch = require('minimatch');
var path = require('path');

function glob(pattern, options) {
	assertIsStringOrArray(pattern, 'glob', 'pattern');
	return function(file, encode) {
		return minimatch(file.relative, pattern, options);
	};
}

function ignore(filename) {
	assertIsString(filename, 'ignore', 'filename');
	var ignoreFilter = null;
	var queue = [];
	fs.readFile(filename, 'utf-8', function(err, data) {
		ignoreFilter = ig().addPattern(
			data
				.replace(/\r/g, '\n').trim().split('\n')
				.filter(function(str) { return str.length > 0; })
				.map(normalize)
		).createFilter();
		queue.forEach(function(entry) {
			entry.callback(ignoreFilter(normalize(entry.filename)));
		});
	});

	return function(file, encode, callback) {
		if (ignoreFilter !== null) {
			callback(ignoreFilter(normalize(file.relative)));
		} else {
			queue.push({
				callback: callback,
				filename: file.relative
			});
		}
	}
}

function normalize(filename) {
	return path.normalize(filename).replace(/\\/g, '/');
}

module.exports = {
	glob: glob,
	ignore: ignore
};
