'use strict';

var check = require('./util').checkFilter;
var fixture = require('./fixture.js');

describe('filter()', function() {
	it('should filter files', function(done) {
		check(fixture.files, fixture.filters.javascript, function(filenames) {
			expect(filenames).toEqual(['a.js', 'b.js']);
			done();
		});
	});
});
