'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	async = require('async'),
	path = require('path'),
	errorHandler = require('./error'),
	mongoose = require('mongoose'),
	Advice = mongoose.model('Advice');

/*
 * Page controllers
 */

exports.advicePage = (req, res) => {
	res.render('index/advice');
};

/*
 * API controllers
 */
exports.doPost = function(req, res) {
	var advice = new Advice({
		name: req.body.name,
		email: req.body.email,
		category: parseInt(req.body.category, 10),
		advice: req.body.advice
	});
	if (req.session.user) {
		// advice.user = req.session.user;
	}

	advice.save(function(err) {
		if (err) return errorHandler.sendError(res, err, 400);
		res.json({
			msg: 'ok'
		});
	});
};
