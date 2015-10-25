'use strict';

var assertIsFunction = require('./assertions').isFunction;
var promisenize = require('./promisenize');
var through = require('through2');

function filter(fn) {
	assertIsFunction(fn);
	return through.obj(function(file, encode, done) {
		promisenize(fn)(file, encode)
				.then(function(isTarget) {
					if (isTarget) {
						this.push(file);
					}
					done();
				}.bind(this), function(err) {
					done(err);
				});
	});
}

module.exports = filter;
