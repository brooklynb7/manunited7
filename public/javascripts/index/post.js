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
				$(selector.post).html(createPostContent(rst));
			})
			.fail(function(jqXHR) {
				console.log(jqXHR);
			})
			.always(function() {
				UI.BlockUI.hide();
			});
	}

	function createPostContent(post) {
		var $div = $('<div class="post-block panel panel-default"/>');

		var $panelBody = $('<div class="panel-body" />');
		var $title = $('<h3>' + post.title + '</h3>');
		var $time = $('<h6>' + UI.convertDateTime(post.create_at) + '</h6>');
		var $jia = $('<div class="jiathis_style_24x24" style="margin-bottom:10px;" />');
		_.each(['tsina', 'weixin', 'douban', 'fb', 'twitter'], function(item) {
			$jia.append('<a class="jiathis_button_' + item + '" />');
		});
		$jia.append(
			'<script type="text/javascript" src="http://v3.jiathis.com/code_mini/jia.js?uid=1344332343487662" charset="utf-8"></script>'
		).append('<div class="clear" />');
		var $content = $('<div class="post-content">' + post.content + '</div>');
		$panelBody.append($title).append($time).append($jia).append($content);

		$div.append($panelBody);

		return $div;
	}

}(jQuery, window.slug));
