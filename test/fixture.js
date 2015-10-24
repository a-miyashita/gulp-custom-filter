'use strict';

var Buffer = require('buffer').Buffer;
var filter = require('../');
var gutil = require('gulp-util');
var path = require('path');

module.exports = {
	files: [
		new gutil.File({
			base: __dirname,
			path: path.join(__dirname, 'a.js'),
			contents: new Buffer('var a = 10;')
		}),
		new gutil.File({
			base: __dirname,
			path: path.join(__dirname, 'b.js')
		}),
		new gutil.File({
			base: __dirname,
			path: path.join(__dirname, 'x.less'),
			contents: new Buffer('* { color: black; }')
		}),
		new gutil.File({
			base: __dirname,
			path: path.join(__dirname, 'y.less')
		})
	],
	filters: {
		buffer: function(file) {
			return file.isBuffer();
		},
		javascript: function(file) {
			var filename = file.basename;
			return filename.length > 3 && filename.indexOf('.js') >= 0;
		}
	}
};
