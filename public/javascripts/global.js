'use strict';

(function($) {

	var selector = {
		i18nZh: '.i18n.zh',
		i18nEn: '.i18n.en',
		container: '.container'
	};

	$(selector.container).css('min-height', $(window).height() - 120);

	var locale = $.cookie('i18nlocale') || 'zh-cn';

	Service.getLocaleFile(locale).done(function(i18nData) {
		$.i18n.load(i18nData);
	});

	$(document).ready(function() {
		bindi18nEnEvent();
		bindi18nZhEvent();
	});

	function bindi18nEnEvent() {
		$(selector.i18nEn).on('click', function() {
			seti18nCookie('en');
			window.location.reload();
		});
	}

	function bindi18nZhEvent() {
		$(selector.i18nZh).on('click', function() {
			seti18nCookie('zh-cn');
			window.location.reload();
		});
	}

	function seti18nCookie(val) {
		$.cookie('i18nlocale', val, {
			expires: 365,
			path: '/'
		});
	}
}(jQuery));
