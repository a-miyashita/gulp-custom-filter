'use strict';

var PluginError = require('plugin-error');

function isFunction(fn, moduleName, targetName) {
	if (!fn || typeof fn !== 'function') {
		throw new PluginError('gulp-custom-filter' + (moduleName ? '.' + moduleName : ''),
				(targetName || fn) + ' must be a function');
	}
}

function isString(str, moduleName, targetName) {
	if (!str || typeof str !== 'string') {
		throw new PluginError('gulp-custom-filter' + (moduleName ? '.' + moduleName : ''),
				(targetName || str) + ' must be a string');
	}
}

function isStringOrArray(strOrArr, moduleName, targetName) {
	if (!strOrArr || (typeof strOrArr !== 'string' && !Array.isArray(strOrArr))) {
		throw new PluginError('gulp-custom-filter' + (moduleName ? '.' + moduleName : ''),
				(targetName || strOrArr) + ' must be a string or an array');
	}
}

module.exports = {
	isFunction: isFunction,
	isString: isString,
	isStringOrArray: isStringOrArray
};
