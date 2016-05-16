'use strict';

var i18n = require('i18n');
i18n.configure({
	locales: ['zh-cn', 'en'],
	defaultLocale: 'zh-cn',
	directory: './public/locales',
	cookie: 'i18nlocale',
	updateFiles: false,
	indent: '\t',
	extension: '.json'
});
exports.i18n = i18n;
