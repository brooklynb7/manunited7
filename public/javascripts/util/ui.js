'use strict';
(function($) {
	var UI = function() {};

	UI.prototype.setDisabled = function(el) {
		$(el).attr('disabled', 'disabled');
	};

	UI.prototype.cancelDisabled = function(el) {
		$(el).removeAttr('disabled');
	};

	UI.prototype.notifySuccessRight = function($elm, msg) {
		$elm.notify(msg, {
			className: 'success',
			position: 'right'
		});
	};

	UI.prototype.notifyErrorGlobal = function(msg) {
		$.notify(msg);
	};

	UI.prototype.notifyErrorRight = function($elm, msg) {
		$elm.notify(msg, {
			position: 'right'
		});
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
