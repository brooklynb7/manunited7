'use strict';

var path = require('path');
var express = require('express');
var pageRouter = express.Router();
var apiRouter = express.Router();
var post = require('../controllers/post');
var admin = require('../controllers/admin');

module.exports = function(app) {
	pageRouter.get('/', post.postsPage);
	pageRouter.get('/:slug', post.postPage);
	app.use('/posts', pageRouter);

	apiRouter.get('/all', admin.requireAdminLoginApi, post.getAllPostList);
	apiRouter.delete('/:id', admin.requireAdminLoginApi, post.deletePost);
	apiRouter.get('/slug/:slug', post.getPostBySlug);
	apiRouter.get('/', post.getPosts);

	app.use('/api/posts', apiRouter);
};
