'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	async = require('async'),
	mongoose = require('mongoose'),
	path = require('path'),
	errorHandler = require('./error'),
	Post = mongoose.model('Post');

/*
 * Page controllers
 */

exports.postsPage = (req, res) => {
	res.render('index/posts');
};

exports.postPage = (req, res) => {
	let slug = req.params.slug;
	res.render('index/post', {
		slug: slug
	});
};

/*
 * API controllers
 */
exports.getPosts = (req, res) => {
	let condition = {
		page: req.query.page,
		size: req.query.size,
		name: req.query.name
	};
	let page = parseInt(condition.page, 10) - 1;
	if (_.isNaN(page)) {
		page = 0;
	}
	let pageSize = parseInt(condition.size, 10);
	if (_.isNaN(pageSize)) {
		pageSize = 20;
	}

	var shortenContent = function(content, slug) {
		if (content.indexOf('<!--more-->') > 0) {
			content = content.substring(0, content.indexOf('<!--more-->')) +
				'<p>......</p>' +
				'<div class="text-right"><a href="/posts/' + slug + '" class="more">' + res.__('more') + '></a></div>';
		}

		return content;
	};

	async.parallel([
		function(callback) {
			Post.count().exec(callback);
		},
		function(callback) {
			Post.find()
				.limit(pageSize)
				.skip(pageSize * page)
				.sort('-create_at')
				.exec(callback);
		}
	], (err, results) => {
		if (err) return errorHandler.sendError(res, err, 400);
		var posts = results[1];
		_.map(posts, function(post) {
			post.content = shortenContent(post.content, post.slug);
		});
		res.json({
			posts: posts,
			count: results[0],
			page: page + 1,
			size: pageSize
		});
	});
};

exports.getAllPostList = (req, res) => {
	Post.find().select('title create_at').sort('-create_at')
		.exec((err, rst) => {
			if (err) return errorHandler.sendError(res, err, 400);
			res.json(rst);
		});
};

exports.getPostBySlug = (req, res) => {
	let slug = req.params.slug;
	Post.findOne({
		slug: slug
	}).exec((err, post) => {
		if (err) return errorHandler.sendError(res, err, 400);
		if (!post) return errorHandler.sendError(res, 'No such post', 404);
		res.json(post);
	});
};

exports.deletePost = (req, res) => {
	let id = req.params.id;
	Post.remove({
		_id: id
	}).exec((err, rst) => {
		if (err) return errorHandler.sendError(res, err, 400);
		res.json('ok');
	});
};
