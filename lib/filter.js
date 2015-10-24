'use strict';

var assertFunction = require('./assert-function');
var through = require('through2');

function filter(fn) {
	assertFunction(fn);
	return through.obj(function(file, encode, done) {
		if (fn.length < 3) {
			if (fn(file, encode)) {
				this.push(file);
			}
			done();
		} else {
			var self = this;
			fn(file, encode, function(err, accepted) {
				if (accepted) {
					self.push(file);
				}
				done(err);
			});
		}
	});
}

module.exports = filter;
