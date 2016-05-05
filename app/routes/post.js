'use strict';

var path = require('path');
var express = require('express');
var pageRouter = express.Router();
var apiRouter = express.Router();
var post = require('../controllers/post');

module.exports = function(app) {
	pageRouter.get('/', post.postsPage);
	pageRouter.get('/:slug', post.postPage);
	app.use('/posts', pageRouter);

	apiRouter.get('/', post.getPosts);
	apiRouter.get('/:slug', post.getPostBySlug);
	app.use('/api/posts', apiRouter);
};
