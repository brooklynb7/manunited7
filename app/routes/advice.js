'use strict';

var express = require('express');
var path = require('path');
var apiRouter = express.Router();
var pageRouter = express.Router();
var advice = require('../controllers/advice');

module.exports = function(app) {
	pageRouter.get('/', advice.advicePage);
	app.use('/advice', pageRouter);

	apiRouter.post('/', advice.doPost);
	app.use('/api/advice', apiRouter);
};
