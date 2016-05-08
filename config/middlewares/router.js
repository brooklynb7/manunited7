'use strict';

var config = require('../config'),
	i18n = require('./i18n').i18n,
	path = require('path');

module.exports = function(app) {
	app.use(i18n.init);

	app.use(function(req, res, next) {
		res.locals.i18nlocale = req.cookies.i18nlocale;
		res.locals.host = req.protocol + '://' + req.hostname;
		res.locals.url = {
			original: req.originalUrl,
			base: req.baseUrl,
			path: req.path
		};
		res.locals._ = require('lodash');
		res.locals.query = req.query;
		res.locals.moment = require('moment');
		res.locals.session = req.session;
		res.locals.referer = req.get('Referer');
		res.locals.utils = require('../../app/utils');

		next();
	});

	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});
};
