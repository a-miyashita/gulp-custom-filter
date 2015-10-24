'use strict';

var check = require('./util').checkFilter;
var filters = require('../lib/pattern-filters');
var fixture = require('./fixture.js');

describe('pattern filters', function() {
	describe('glob()', function() {
		it('should filter with glob pattern', function(done) {
			check(fixture.files, filters.glob('*.js'), function(filenames) {
				expect(filenames).toEqual(['a.js', 'b.js']);
				done();
			});
		});
	});
});
