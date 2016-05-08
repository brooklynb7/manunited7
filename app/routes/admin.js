'use strict';

var path = require('path');
var express = require('express');
var pageRouter = express.Router();
var apiRouter = express.Router();
var admin = require('../controllers/admin');

module.exports = app => {
	app.get('/admin/login', admin.loginPage);
	app.get('/admin/logout', admin.logoutPage);
	app.post('/api/admin/login', admin.doLogin);

	pageRouter.get('/', admin.indexPage);
	pageRouter.get('/posts', admin.postsPage);
	app.use('/admin', admin.requireAdminLogin, pageRouter);
};
