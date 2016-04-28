'use strict';

(function($) {
	var Service = function() {
		this.url_prefix = '/api';
	};

	Service.prototype.getLocaleFile = function(locale) {
		return $.ajax({
			method: 'GET',
			url: '/static/locales/' + locale + '.js',
			async: false,
			dataType: 'json'
		});
	};

	Service.prototype.getApiUrl = function(serviceUrl) {
		if (serviceUrl.indexOf('/') !== 0) {
			serviceUrl = '/' + serviceUrl;
		}
		return this.url_prefix + serviceUrl;
	};

	window.Service = new Service();
}(jQuery));
