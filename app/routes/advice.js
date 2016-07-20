'use strict';

const express = require('express'),
	path = require('path'),
	apiRouter = express.Router(),
	pageRouter = express.Router(),
	admin = require('../controllers/admin'),
	advice = require('../controllers/advice');

module.exports = function(app) {
	pageRouter.get('/', advice.advicePage);
	app.use('/advice', pageRouter);

	apiRouter.post('/', advice.doPost);
	apiRouter.get('/', admin.requireAdminLoginApi, advice.getAdvice);
	apiRouter.delete('/:adviceId', admin.requireAdminLoginApi, advice.removeAdvice);
	app.use('/api/advice', apiRouter);
};
