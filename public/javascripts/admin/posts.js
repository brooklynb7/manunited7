'use strict';

(function($, referer) {

	var selector = {
		list: '.list-group',
		removePost: '.removePost'
	};

	$(document).ready(function() {
		loadAllPosts();
		bindRemovePostEvent();
	});

	function loadAllPosts() {
		UI.BlockUI.show();
		Service.getAllPostList()
			.done(function(rst) {
				$(selector.list).empty();
				_.each(rst, function(post) {
					$(selector.list).append(createPostRow(post));
				});
			})
			.fail(function(jqXHR) {
				$.notify(jqXHR.responseJSON.msg, 'error');
			})
			.always(function() {
				UI.BlockUI.hide();
			});
	}

	function createPostRow(post) {
		var $div = $('<div class="list-group-item row" id="' + post._id + '"/>');

		var $title = $('<a href="/admin/posts/' + post._id + '" class="col-md-9 col-sm-8 col-xs-7">' + post.title + '</a>');
		var $removePost = $(
			'<a href="javascript:void(0)" class="pull-right removePost glyphicon glyphicon-remove" post-id="' +
			post._id + '" post-title="' + post.title + '"></a>');
		var $time = $('<span class="pull-right">' + UI.convertDateTime(post.create_at) + '</span></div>');
		var $right = $('<div class="col-md-3 col-sm-4 col-xs-5" />')
			.append($removePost).append($time);

		$div.append($title).append($right);

		return $div;
	}

	function bindRemovePostEvent() {
		$(selector.list).on('click', selector.removePost, function() {
			var $this = $(this);
			var postId = $this.attr('post-id');
			UI.Modal.confirm({
				title: $.i18n._('delArticle'),
				html: '<div>' + $this.attr('post-title') + '<br/><br/>' + $.i18n._('whetherDelArticle') + '</div>',
				confirm: removePostFn(postId)
			});
		});
	}

	function removePostFn(postId) {
		return function($modal) {
			var postRowId = '#' + postId;
			var $postRow = $(postRowId);
			UI.BlockUI.show(postRowId);
			Service.deletePost(postId)
				.done(function() {
					$postRow.remove();
				})
				.fail(function(jqXHR) {
					$.notify(jqXHR.responseJSON.msg, 'error');
				})
				.always(function() {
					UI.BlockUI.hide(postRowId);
					$modal.modal('hide');
				});
		};
	}

}(jQuery, window.referer));
