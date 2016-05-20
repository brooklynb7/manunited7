'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	async = require('async'),
	util = require('../utils'),
	mongoose = require('mongoose'),
	Post = mongoose.model('Post');

var BASIC_PROJECTION = 'title cover_img slug';

exports.getTodayPostList = (callback) => {
	var condition = {
		visible: 1,
		'create_at': {
			$gte: util.getDayTimestamp(0),
			$lt: util.getDayTimestamp(1)
		}
	};
	var options = {
		sort: {
			'create_at': -1
		}
	};
	Post.find(condition, BASIC_PROJECTION, options, callback);
};

exports.getLast5PostList = function(callback) {
	var condition = {
		visible: 1
	};
	var options = {
		limit: 5,
		sort: {
			'create_at': -1
		}
	};
	Post.find(condition, BASIC_PROJECTION, options, callback);
};
