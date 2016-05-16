'use strict';

(function($) {
	var show = function(options) {
		if (typeof options === 'string') {
			options = {
				target: options
			};
		} else {
			options = $.extend(true, {}, options);
		}
		var html = '<div class="loading-message"><img src="/static/images/loading.gif" align=""></div>';
		var overlayCSS = {
			backgroundColor: options.overlayColor ? options.overlayColor : '#000',
			opacity: options.boxed ? 0.05 : 0.1,
			cursor: 'wait'
		};
		var baseZ = options.zIndex ? options.zIndex : 1000;
		var css = {
			border: '0',
			padding: '0',
			backgroundColor: 'none'
		};

		if (options.target) { // element blocking
			var el = $(options.target);
			if (el.height() <= ($(window).height())) {
				options.cenrerY = true;
			}
			css.top = '10%';
			el.block({
				message: html,
				baseZ: baseZ,
				centerY: options.cenrerY !== undefined ? options.cenrerY : false,
				css: css,
				overlayCSS: overlayCSS
			});
		} else { // page blocking
			$.blockUI({
				message: html,
				baseZ: baseZ,
				css: css,
				overlayCSS: overlayCSS
			});
		}
	};

	var hide = function(target) {
		if (target) {
			$(target).unblock({
				onUnblock: function() {
					$(target).css('position', '');
					$(target).css('zoom', '');
				}
			});
		} else {
			$.unblockUI();
		}
	};

	window.UI = window.UI || {};

	window.UI.BlockUI = {
		show: show,
		hide: hide
	};
}(jQuery));
