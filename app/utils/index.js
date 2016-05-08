'use strict';

var _ = require('lodash');
var crypto = require('crypto');

exports.regex = {
	mobile: /^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
};

exports.getRealIP = ipString => {
	if (!ipString) {
		return ipString;
	}
	var realIP = null;
	var ipArray = ipString.split(':');
	if (ipArray.length === 1) {
		realIP = ipString;
	} else {
		var ip = ipArray[ipArray.length - 1];
		if (ip === '1') {
			realIP = '127.0.0.1';
		} else {
			realIP = ip;
		}
	}

	return realIP;
};

exports.md5 = text => {
	return crypto.createHash('md5').update(text).digest('hex');
};

exports.random = (upper, floor) => {
	upper = typeof upper === 'number' ? upper : 100;
	floor = typeof floor === 'number' ? floor : 0;
	return parseInt(Math.random() * (upper - floor + 1) + floor, 10);
};
