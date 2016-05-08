'use strict';

(function($, referer) {

	var selector = {
		loginBtn: '#signInBtn',
		userNameInput: '#userNameInput',
		pwdInput: '#pwdInput'
	};

	$(document).ready(function() {
		bindLoginEvent();
	});

	function bindLoginEvent() {
		$(selector.loginBtn).on('click', function() {
			UI.setDisabled(selector.loginBtn);
			UI.BlockUI.show(selector.loginBtn);
			Service.doAdminLogin($(selector.userNameInput).val(), $(selector.pwdInput).val())
				.done(function(rst) {
					window.location.href = UI.getUrlParameter('origin');
				})
				.fail(function(jqXHR) {
					$.notify(jqXHR.responseJSON.msg, 'error');
				})
				.always(function() {
					UI.BlockUI.hide(selector.loginBtn);
					UI.cancelDisabled(selector.loginBtn);
				});
		});
	}
}(jQuery, window.referer));
