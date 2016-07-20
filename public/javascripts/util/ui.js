'use strict';
(function($) {
	var UI = function() {};

	UI.prototype.setDisabled = function(el) {
		$(el).attr('disabled', 'disabled');
	};

	UI.prototype.cancelDisabled = function(el) {
		$(el).removeAttr('disabled');
	};

	var notify = function($elm, msg, className, position) {
		$elm.notify(msg, {
			className: className,
			position: position
		});
	};

	UI.prototype.notifyErrorGlobal = function(msg) {
		$.notify(msg);
	};

	UI.prototype.notifySuccessGlobal = function(msg) {
		$.notify(msg, 'success');
	};

	UI.prototype.notifySuccessLeft = function($elm, msg) {
		notify($elm, msg, 'success', 'left');
	};

	UI.prototype.notifySuccessRight = function($elm, msg) {
		notify($elm, msg, 'success', 'right');
	};

	UI.prototype.notifySuccessBottom = function($elm, msg) {
		notify($elm, msg, 'success', 'bottom');
	};

	UI.prototype.notifyErrorLeft = function($elm, msg) {
		notify($elm, msg, 'error', 'left');
	};

	UI.prototype.notifyErrorRight = function($elm, msg) {
		notify($elm, msg, 'error', 'right');
	};

	UI.prototype.notifyErrorTop = function($elm, msg) {
		notify($elm, msg, 'error', 'top');
	};

	UI.prototype.notifyErrorBottom = function($elm, msg) {
		notify($elm, msg, 'error', 'bottom');
	};

	UI.prototype.convertDate = function(timestamp) {
		return moment(new Date(timestamp)).format('YYYY-MM-DD');
	};

	UI.prototype.convertDateTime = function(timestamp) {
		return moment(new Date(timestamp)).format('YYYY-MM-DD HH:mm:ss');
	};

	UI.prototype.getUrlParameter = function(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	};

	window.UI = new UI();
}(jQuery));
