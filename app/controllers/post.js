'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	async = require('async'),
	path = require('path'),
	errorHandler = require('./error'),
	mongoose = require('mongoose'),
	PostService = require(path.resolve('./app/services/post')),
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
var getPostObject = function(form) {
	return {
		title: form.title,
		slug: form.slug,
		short_desc: form.shortDesc,
		content: form.content,
		tag: form.tag.split('|'),
		source: form.source,
		originalUrl: form.originalUrl,
		cover_img: form.coverImg,
		visible: parseInt(form.visible, 10)
	};
};

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
			Post.find({
				visible: 1
			}).limit(pageSize).skip(pageSize * page).sort('-create_at').exec(callback);
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

var getPostCallbackFn = (err, post, res) => {
	if (err) return errorHandler.sendError(res, err, 400);
	if (!post) return errorHandler.sendError(res, 'No such post', 404);
	res.json(post);
};

exports.getPostBySlug = (req, res) => {
	let slug = req.params.slug;
	Post.findOne({
		slug: slug
	}).exec((err, post) => {
		getPostCallbackFn(err, post, res);
	});
};

exports.getPostById = (req, res) => {
	let id = req.params.id;
	Post.findById(id).exec((err, post) => {
		getPostCallbackFn(err, post, res);
	});
};

exports.createPost = (req, res) => {
	let post = new Post(getPostObject(req.body));
	post.save(function(err) {
		if (err) return errorHandler.sendError(res, err, 400);
		res.json({
			msg: 'ok'
		});
	});
};

exports.updatePost = (req, res) => {
	let id = req.params.id;
	Post.findByIdAndUpdate(id, getPostObject(req.body), function(err, post) {
		if (err) return errorHandler.sendError(res, err, 400);
		res.json({
			msg: 'ok'
		});
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


exports.fixDuitangImgSslIssue = (req, res) => {
	async.waterfall([
		(callback) => {
			PostService.getAllPosts(callback);
		}, (posts, calllback) => {
			let fixFns = [];
			_.each(posts, (post) => {
				fixFns.push((calllback) => {
					PostService.fixDuitangImgSslIssue(post, calllback);
				});
			});
			async.parallel(fixFns, calllback);
		}
	], (err, rst) => {
		if (err) return errorHandler.sendError(res, err, 400);
		res.json('ok');
	});
};
