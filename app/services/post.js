'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash'),
	async = require('async'),
	path = require('path'),
	util = require(path.resolve('./app/utils/index')),
	mongoose = require('mongoose'),
	Post = mongoose.model('Post');

const BASIC_PROJECTION = 'title cover_img slug';

exports.getAllPosts = (callback) => {
	Post.find({}, callback);
};

exports.fixDuitangImgSslIssue = (post, callback) => {
	post.content = post.content.replace(/http:\/\/img3.duitang.com/g, 'https://a-ssl.duitang.com');
	if (post.cover_img) {
		post.cover_img = post.cover_img.replace(/http:\/\/img3.duitang.com/g, 'https://a-ssl.duitang.com');
	}
	post.save(callback);
};

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
