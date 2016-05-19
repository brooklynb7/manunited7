'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	async = require('async'),
	moment = require('moment'),
	mongoose = require('mongoose'),
	Post = mongoose.model('Post');

exports.getTodayPostList = (callback) => {
	var condition = {
		visible: 1,
		'create_at': {
			$gte: new Date(moment().format('YYYY-MM-DD 00:00:00')).getTime(),
			$lt: new Date(moment().add(1, 'days').format('YYYY-MM-DD 00:00:00')).getTime()
		}
	};
	var projection = 'title cover_img slug';
	var options = {
		sort: {
			'create_at': -1
		}
	};
	Post.find(condition, projection, options, callback);
};

exports.getLast5PostList = function(callback) {
	var condition = {
		visible: 1
	};
	var projection = 'title cover_img slug';
	var options = {
		limit: 5,
		sort: {
			'create_at': -1
		}
	};
	Post.find(condition, projection, options, callback);
};
