'use strict';

(function($, PostForm) {

	var selector = {
		publishBtn: '#publishBtn'
	};

	$(document).ready(function() {
		bindPublishPostEvent();
	});

	function bindPublishPostEvent() {
		$(selector.publishBtn).on('click', function() {
			PostForm.setContentFromEditor();
			var $this = $(this);
			var checkMsg = PostForm.checkPostFields();
			if (checkMsg) {
				UI.notifyErrorRight($this, checkMsg);
			} else {
				UI.BlockUI.show(selector.publishBtn);
				UI.setDisabled(selector.publishBtn);
				Service.createPost(PostForm.getPostObject())
					.done(function() {
						window.location.href = '/admin/posts';
					})
					.fail(function(jqXHR) {
						UI.notifyErrorRight($this, jqXHR.responseJSON.msg);
					})
					.always(function() {
						UI.BlockUI.hide(selector.publishBtn);
						UI.cancelDisabled(selector.publishBtn);
					});
			}
		});
	}

}(jQuery, window.PostForm));
