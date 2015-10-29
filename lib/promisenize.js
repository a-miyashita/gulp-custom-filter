'use strict';

var Promise = Promise || require('promise');
var assertIsFunction = require('./assertions').isFunction;

function promisenize(fn) {
	assertIsFunction(fn, null, 'target');
	if (fn.length < 3) {
		return function(file, encode) {
			try {
				return Promise.resolve(fn(file, encode));
			} catch (err) {
				return Promise.reject(err);
			}
		}
	} else {
		return function(file, encode) {
			return new Promise(function(resolve, reject) {
				fn(file, encode, function(err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		}
	}
}

module.exports = promisenize;
