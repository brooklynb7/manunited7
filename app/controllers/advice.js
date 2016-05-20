'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	async = require('async'),
	path = require('path'),
	errorHandler = require('./error'),
	mongoose = require('mongoose'),
	Post = mongoose.model('Post');

/*
 * Page controllers
 */

exports.advicePage = (req, res) => {
	res.render('index/advice');
};

/*
 * API controllers
 */
