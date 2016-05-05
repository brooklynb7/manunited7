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

	// Twitter API
	Service.prototype.getTwitterApiUrl = function(path) {
		return this.getApiUrl('twitter') + path;
	};

	Service.prototype.getTwitterUnitedMembersTimeline = function() {
		return $.ajax({
			method: 'GET',
			url: this.getTwitterApiUrl('/united-members-timeline')
		});
	};

	window.Service = new Service();
}(jQuery));
