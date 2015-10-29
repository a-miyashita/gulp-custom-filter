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
	fs.readFile(filename, function(err, data) {
		if (err) {
			gutil.log(gutil.colors.red('gulp-custom-filter.ignore: ' + err));
			ignoreFilter = ig().createFilter();
		} else {
			ignoreFilter = ig().addPattern(
				data.toString('utf-8')
					.replace(/\r/g, '\n').trim().split('\n')
					.filter(function (str) {
						return str.length > 0;
					})
					.map(normalize)
			).createFilter();
		}
		queue.forEach(function(entry) {console.log(ignoreFilter(entry.filename));
			entry.callback(null, ignoreFilter(normalize(entry.filename)));
		});
	});

	return function(file, encode, callback) {
		if (ignoreFilter !== null) {
			callback(null, ignoreFilter(normalize(file.relative)));
		} else {
			queue.push({
				callback: callback,
				filename: file.relative
			});
		}
	};
}

function normalize(filename) {
	return path.normalize(filename).replace(/\\/g, '/');
}

module.exports = {
	glob: glob,
	ignore: ignore
};
