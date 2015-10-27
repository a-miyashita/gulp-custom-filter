'use strict';

var Set = require('es6-set');
var assertIsString = require('./assertions').isString;
var assertIsStringOrArray = require('./assertions').isStringOrArray;
var fs = require('fs');
var gutil = require('gulp-util');
var minimatch = require('minimatch');
var path = require('path');

function glob(pattern, options) {
	assertIsStringOrArray(pattern, 'glob', 'pattern');
	return function(file, encode) {
		return minimatch(file.relative, pattern, options);
	};
}

function ignore(files) {
	assertIsStringOrArray(files, 'ignore', 'files');
	if (typeof files === 'string') {
		files = [files];
	}
	files = files.map(normalize);
	var ignoredFiles = new Set(files);
	return function(file, encode) {
		return !ignoredFiles.has(normalize(file.relative));
	};
}

function ignoreList(filename) {
	assertIsString(filename, 'ignoreList', 'filename');
	var ignoredFiles = null;
	var queue = [];
	fs.readFile(filename, 'utf-8', function(err, data) {
		var files = data
				.replace(/\r/g, '\n').trim().split('\n')
				.filter(function(str) { return str.length > 0; })
				.map(normalize);
		ignoredFiles = new Set(files);
		queue.forEach(function(entry) {
			entry.callback(!ignoredFiles.has(normalize(entry.filename)));
		});
	});

	return function(file, encode, callback) {
		if (ignoredFiles !== null) {
			callback(!ignoredFiles.has(normalize(file.relative)));
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
