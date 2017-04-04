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

	apiRouter.delete('/:id', admin.requireAdminLoginApi, post.deletePost);
	apiRouter.post('/', admin.requireAdminLoginApi, post.createPost);
	apiRouter.put('/:id', admin.requireAdminLoginApi, post.updatePost);
	apiRouter.get('/all', admin.requireAdminLoginApi, post.getAllPostList);
	apiRouter.get('/slug/:slug', post.getPostBySlug);
	apiRouter.get('/issue/fixduitangimageissue', admin.requireAdminLoginApi, post.fixDuitangImgSslIssue);
	apiRouter.get('/:id', admin.requireAdminLoginApi, post.getPostById);
	apiRouter.get('/', post.getPosts);

	app.use('/api/posts', apiRouter);
};
