'use strict';

const url = require('url'),
	path = require('path'),
	request = require('request'),
	config = require(path.resolve('./config/config')),
	errorHandler = require(path.resolve('./app/controllers/error'));

const api_host = config.twitter.api_host;
const consumer_key = config.twitter.consumer_key;
const consumer_secret = config.twitter.consumer_secret;
const access_token = config.twitter.access_token;
const access_token_secret = config.twitter.access_token_secret;

let getListTimelineUrl = function(name) {
	return '/lists/statuses.json?slug=' + name + '&owner_screen_name=brooklynb7_';
};

let generateOAuthRequestOption = function(api_url, req) {
	let requestOption = {
		url: api_host + api_url,
		oauth: {
			consumer_key: consumer_key,
			consumer_secret: consumer_secret,
			token: access_token,
			token_secret: access_token_secret
		}
	};
	if (config.needProxy) {
		requestOption.proxy = config.proxyUrl;
	}
	return requestOption;
};

exports.unitedMembersTimelinePage = function(req, res) {
	res.render('index/unitedMembersTimeline');
};

/* API Controller */
exports.getUnitedMembersTimeline = function(req, res) {
	request.get(generateOAuthRequestOption(getListTimelineUrl('unitedMembers'), req), function(e, r, body) {
		if (e) return errorHandler.sendError(res, e, 400);
		res.json(JSON.parse(body));
	});
	// res.json(test_twitter_data);
};

// exports.saysForAdmin = function(req, res) {
// 	request.get(generateOAuthRequestOption(getListTimelineUrl('unitedMembers'), req), function(e, r, body) {
// 		res.render('admin/says', {
// 			sayList: JSON.parse(body)
// 		});
// 	});
// 	/* res.render('page/says', {
// 		sayList: test_twitter_data
// 	}); */
// };
//
// exports.showListTimeline = function(req, res) {
// 	request.get(generateOAuthRequestOption(getListTimelineUrl(req.params.name), req), function(e, r, body) {
// 		// res.render('api_demo/get_profile', {result:JSON.parse(body)});
// 		res.send(JSON.parse(body));
// 	});
// };
