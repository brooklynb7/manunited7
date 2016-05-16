'use strict';

var path = require('path');
var express = require('express');
var pageRouter = express.Router();
var twitter = require('../controllers/twitter');

module.exports = function(app) {

	pageRouter.get('/', twitter.unitedMembersTimelinePage);

	app.use('/', pageRouter);
};
