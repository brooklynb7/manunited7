'use strict';

(function($, slug) {

	var selector = {
		post: '.post'
	};

	$(document).ready(function() {
		loadPost(slug);
	});

	function loadPost(slug) {
		UI.BlockUI.show();
		Service.getPostBySlug(slug)
			.done(function(rst) {
				$(selector.post).html(UI.Post.createPost(rst));
			})
			.fail(function(jqXHR) {
				console.log(jqXHR);
			})
			.always(function() {
				UI.BlockUI.hide();
			});
	}

}(jQuery, window.slug));
