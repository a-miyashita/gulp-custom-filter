'use strict';

var gutil = require('gulp-util');

function isFunction(fn, moduleName, targetName) {
	if (!fn || typeof fn !== 'function') {
		throw new gutil.PluginError('gulp-custom-filter' + (moduleName ? '.' + moduleName : ''),
				(targetName || fn) + ' must be a function');
	}
}

function isStringOrArray(strOrArr, moduleName, targetName) {
	if (!strOrArr || (typeof strOrArr !== 'string' && !Array.isArray(strOrArr))) {
		throw new gutil.PluginError('gulp-custom-filter' + (moduleName ? '.' + moduleName : ''),
				(targetName || fn) + ' must be a string or an array');
	}
}

module.exports = {
	isFunction: isFunction,
	isStringOrArray: isStringOrArray
};
