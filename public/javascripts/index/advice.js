'use strict';

(function($) {
	var selector = {
		panel: '.panel',
		nameInput: '#inputName',
		emailInput: '#inputEmail',
		adviceInput: '#inputAdvice',
		adviceCount: '.adviceCount',
		postAdviceBtn: '#postAdviceBtn'
	};

	var adviceCountThreshold = 200;

	$(document).ready(function() {
		bindPostAdviceEvent();
		bindAdviceChangeEvent();
	});
	//
	//
	function bindAdviceChangeEvent() {
		$(selector.adviceInput).on('input', function() {
			var adviceLength = $(this).val().length;
			$(selector.adviceCount).html(adviceLength);
			if (adviceLength > adviceCountThreshold) {
				$(selector.adviceCount).addClass('united_red');
			} else {
				$(selector.adviceCount).removeClass('united_red');
			}
		});
	}

	function bindPostAdviceEvent() {
		$(selector.postAdviceBtn).on('click', function() {
			var $this = $(this);
			var adviceVal = $(selector.adviceInput).val();
			if (!adviceVal) {
				UI.notifyErrorLeft($this, $.i18n._('feedbackShouldNotEmpty'));
			} else {
				UI.BlockUI.show(selector.postAdviceBtn);
				Service.addAdvice({
					name: $(selector.nameInput).val(),
					email: $(selector.emailInput).val(),
					category: $('input[type="radio"][name="categoryOptions"]:checked').val(),
					advice: adviceVal
				}).done(function() {
					UI.notifySuccessGlobal($.i18n._('thanksForFeedback'));
					resetAdviceForm();
				}).fail(function(jqXHR) {
					UI.notifyErrorLeft($this, jqXHR.responseJSON.msg);
				}).always(function() {
					UI.BlockUI.hide(selector.postAdviceBtn);
				});
			}
		});
	}

	function resetAdviceForm() {
		$(selector.adviceInput).val('');
		$(selector.adviceCount).html(0);
	}
	//
}(jQuery));
