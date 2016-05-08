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

	// Posts API
	Service.prototype.getPostsApiUrl = function(path) {
		return this.getApiUrl('posts') + path;
	};

	Service.prototype.getPosts = function(condition, page, size) {
		condition.page = page;
		condition.size = size;
		return $.ajax({
			url: this.getPostsApiUrl('/'),
			data: condition,
			method: 'GET'
		});
	};

	Service.prototype.getPostBySlug = function(slug) {
		return $.ajax({
			url: this.getPostsApiUrl('/' + slug),
			method: 'GET'
		});
	};

	// Admin API
	Service.prototype.getAdminApiUrl = function(path) {
		return this.getApiUrl('admin') + path;
	};

	Service.prototype.doAdminLogin = function(user, pwd) {
		return $.ajax({
			url: this.getAdminApiUrl('/login'),
			data: {
				user: user,
				password: pwd
			},
			method: 'POST'
		});
	};

	window.Service = new Service();
}(jQuery));
