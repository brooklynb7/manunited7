'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	async = require('async'),
	mongoose = require('mongoose'),
	path = require('path'),
	util = require('../utils'),
	errorHandler = require('./error'),
	Admin = mongoose.model('Admin');

var url_admin_login = '/admin/login';
var url_admin = '/admin';

/*
 * Page controllers
 */
exports.indexPage = (req, res) => {
	res.render('admin/index');
};

exports.loginPage = (req, res) => {
	if (req.session.admin_id) return res.redirect(url_admin);
	res.render('admin/login');
};

exports.logoutPage = (req, res) => {
	req.session.admin_id = null;
	req.session.admin_name = null;
	res.redirect(url_admin);
};

exports.postsPage = (req, res) => {
	res.render('admin/posts');
};

exports.postPage = (req, res) => {
	res.render('admin/editPost', {
		postId: req.params.id
	});
};

exports.newPostPage = (req, res) => {
	res.render('admin/newPost');
};

exports.advicePage = (req, res) => {
	res.render('admin/advice');
};

exports.requireAdminLogin = (req, res, next) => {
	if (req.session.admin_id) return next();
	res.redirect(url_admin_login + '?origin=' + encodeURIComponent(req.originalUrl));
};

/*
 * API controllers
 */
exports.doLogin = (req, res) => {
	if (req.session.admin_id) return errorHandler.sendError(res, res.__('loggedIn'), 400);
	var user = req.body.user;
	var password = util.md5(req.body.password);
	Admin.findOne({
		name: user,
		password: password
	}).exec((err, rst) => {
		if (err) return errorHandler.sendError(res, err, 400);
		if (rst) {
			req.session.admin_id = rst._id.toString();
			req.session.admin_name = rst.name;
			res.send('ok');
		} else {
			errorHandler.sendError(res, res.__('wrongUserPassword'), 400);
		}
	});
};

exports.requireAdminLoginApi = (req, res, next) => {
	if (req.session.admin_id) return next();
	errorHandler.sendError(res, res.__('notAuthorized'), 403);
};
