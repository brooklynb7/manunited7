'use strict';

(function($) {

	var selector = {
		posts: '.posts',
		paginater: '.paginater'
	};

	var pageSize = 5;

	$(document).ready(function() {
		loadPosts({}, 1, pageSize);
	});

	function loadPosts(condition, page, size) {
		UI.BlockUI.show();
		Service.getPosts(condition, page, size)
			.done(function(rst) {
				$(selector.posts).empty();
				_.each(rst.posts, function(post) {
					$(selector.posts).append(UI.Post.createPostListItem(post));
				});
				$(selector.paginater).html(UI.Pagination.show({
					total: rst.count,
					size: rst.size,
					current: rst.page,
					cb: function(page, size) {
						loadPosts(condition, page, size);
					}
				}));
				$(window).scrollTop(0);
			})
			.fail(function(jqXHR) {
				console.log(jqXHR);
			})
			.always(function() {
				UI.BlockUI.hide();
			});
	}
}(jQuery));
