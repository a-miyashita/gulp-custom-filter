'use strict';

var filter = require('./lib/filter');

// basic filters
var basic = require('./lib/basic-filters');
filter.not = basic.not;
filter.and = basic.and;
filter.or = basic.or;
filter.all = basic.all;
filter.none = basic.none;

// pattern filters
var pattern = require('./lib/pattern-filters');
filter.glob = pattern.glob;

module.exports = filter;
