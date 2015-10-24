'use strict';

var gutil = require('gulp-util');

function assertFunction(fn, name) {
	if (!fn || typeof fn !== 'function') {
		throw new gutil.PluginError('gulp-custom-filter' + (name ? '.' + name : ''),
				'filter must be a function');
	}
}

module.exports = assertFunction;
