'use strict';

(function($, PostForm, postId) {

	var selector = {
		editBtn: '#editBtn',
		postForm: '.panel-body'
	};

	$(document).ready(function() {
		loadPostById(postId);
		bindEditPostEvent();
	});

	function loadPostById(id) {
		if (!id) {
			UI.notifyErrorGlobal($.i18n._('noPostId'));
		} else {
			UI.BlockUI.show(selector.postForm);
			Service.getPostById(id)
				.done(function(post) {
					PostForm.setPostForm(post);
				})
				.fail(function(jqXHR) {
					UI.notifyErrorGlobal(jqXHR.responseJSON.msg);
				})
				.always(function() {
					UI.BlockUI.hide(selector.postForm);
				});
		}
	}

	function bindEditPostEvent() {
		$(selector.editBtn).on('click', function() {
			PostForm.setContentFromEditor();
			var $this = $(this);
			var checkMsg = PostForm.checkPostFields();
			if (checkMsg) {
				UI.notifyErrorRight($this, checkMsg);
			} else {
				UI.BlockUI.show(selector.editBtn);
				UI.setDisabled(selector.editBtn);
				Service.updatePost(postId, PostForm.getPostObject())
					.done(function() {
						UI.notifySuccessRight($this, $.i18n._('updatePostSuccess'));
					})
					.fail(function(jqXHR) {
						UI.notifyErrorRight($this, jqXHR.responseJSON.msg);
					})
					.always(function() {
						UI.BlockUI.hide(selector.editBtn);
						UI.cancelDisabled(selector.editBtn);
					});
			}
		});
	}

}(jQuery, window.PostForm, window.postId));
