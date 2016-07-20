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

exports.getAdvice = (req, res) => {
	var queryObj = {};

	var page = parseInt(req.query.page, 10) - 1;
	if (_.isNaN(page)) {
		page = 0;
	}
	var pageSize = parseInt(req.query.size, 10);
	if (_.isNaN(pageSize)) {
		pageSize = 0;
	}

	async.parallel([
		(callback) => {
			Advice.count(queryObj, callback);
		}, (callback) => {
			Advice
				.find(queryObj)
				.sort(req.query.sort || '-created')
				.skip(page * pageSize).limit(pageSize)
				.exec(callback);
		}
	], (err, results) => {
		if (err) return errorHandler.sendError(res, err, 400);
		res.json({
			advice: results[1],
			count: results[0],
			page: page + 1,
			size: pageSize
		});
	});
};

exports.removeAdvice = function(req, res) {
	Advice
		.findByIdAndRemove(req.params.adviceId, function(err) {
			if (err) return errorHandler.sendError(res, err, 400);
			res.json({
				msg: 'ok'
			});
		});
};
