'use strict';

var path = require('path');
var express = require('express');
var pageRouter = express.Router();
var apiRouter = express.Router();
var twitter = require('../controllers/twitter');

module.exports = function(app) {
	pageRouter.get('/', twitter.unitedMembersTimelinePage);
	pageRouter.get('/reds', twitter.unitedMembersTimelinePage);
	app.use('/twitter', pageRouter);

	apiRouter.get('/united-members-timeline', twitter.getUnitedMembersTimeline);
	app.use('/api/twitter', apiRouter);
};
