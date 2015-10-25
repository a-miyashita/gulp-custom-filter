'use strict';

var filter = require('../lib/filter');

function checkFilter(files, targetFilter, assertion) {
	var filtered = [];
	var stream = filter(targetFilter);

	stream.on('data', function (file) {
		filtered.push(file);
	});
	stream.on('end', function() {
		assertion(filtered.map(function(file) { return file.basename; }));
	});
	files.forEach(function(file) {
		stream.write(file);
	});
	stream.end();
}

module.exports = {
	checkFilter: checkFilter
};
