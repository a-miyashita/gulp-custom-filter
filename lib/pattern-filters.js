'use strict';

var assertIsStringOrArray = require('./assertions').isStringOrArray;
var gutil = require('gulp-util');
var minimatch = require('minimatch');

function glob(pattern, options) {
	assertIsStringOrArray(pattern, 'glob', 'pattern');
	return function(file, encode) {
		return minimatch(file.relative, pattern, options);
	};
}

module.exports = {
	glob: glob
};
