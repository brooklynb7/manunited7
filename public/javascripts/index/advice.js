'use strict';

(function($) {
	var selector = {
		panel: '.panel',
		nameInput: '#inputName',
		emailInput: '#inputEmail',
		categorySelect: '#selectCategory',
		adviceInput: '#inputAdvice',
		adviceCount: '.adviceCount',
		postAdviceBtn: '#postAdviceBtn'
	};

	var adviceCountThreshold = 200;
	//
	// 	var dialog_title = '意见与反馈';
	//
	$(document).ready(function() {
		// bindPostAdviceEvent();
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
			var adviceVal = $(selector.adviceInput).val();
			var adviceVal = $(selector.adviceInput).val();
			$adviceMsg.empty();
			if (!adviceVal) {
				UI.Modal.errorDialog(dialog_title, '请填写您的意见!');
				return;
			} else {
				UI.BlockUI.show(selector.panel);
				Service.addAdvice({
					name: $(selector.nameInput).val(),
					email: $(selector.emailInput).val(),
					category: $(selector.categorySelect).val(),
					advice: adviceVal,
				}).done(function() {
					UI.Modal.msgDialog(dialog_title, '感谢您提出的宝贵意见!');
					resetAdviceForm();
				}).fail(function(jqXHR) {
					$adviceMsg.html(jqXHR.responseText);
				}).always(function() {
					m.unblockUI(selector.panel);
				});
			}
		});
	}


	function resetAdviceForm() {
		// $(selector.categorySelect).val('1');
		$(selector.adviceInput).val('');
		$(selector.adviceCount).html(0);
	}
	//
}(jQuery));
