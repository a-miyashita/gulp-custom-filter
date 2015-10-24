'use strict';

var gutil = require('gulp-util');
var minimatch = require('minimatch');

function glob(pattern, options) {
	if (typeof pattern !== 'string' && typeof pattern !== 'array') {
		throw new gutil.PluginError('gulp-custom-filter.glob', '`pattern` should be a string or an array');
	}
	return function(file, encode) {
		return minimatch(file.relative, pattern, options);
	};
}

module.exports = {
	glob: glob
};
