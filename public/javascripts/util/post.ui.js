'use strict';

(function($) {
	var createPanel = function() {
		return $('<div class="row post-block panel panel-default"/>');
	};

	var createPanelBody = function() {
		return $('<div class="panel-body" />');
	};

	var createTitle = function(title) {
		return $('<div class="title">' + title + '</h3>');
	};

	var createTitleLink = function(title, link) {
		return $('<div class="title"><a href="' + link + '">' + title + '</a></div>');
	};

	var createTime = function(time) {
		return $('<h6 class="time">' + time + '</h6>');
	};

	var createContent = function(content) {
		return $('<div class="post-content">' + content + '</div>');
	};

	var createJia = function(post) {
		var $jia = $('<div class="jiathis_style_24x24" style="margin-bottom:10px;" />');
		_.each(['tsina', 'weixin', 'douban', 'fb', 'twitter'], function(item) {
			$jia.append('<a class="jiathis_button_' + item + '" />');
		});
		window.jiathis_config = {
			title: '#manunited7#',
			summary: post.title
		};
		$jia.append(
			'<script type="text/javascript" src="http://v3.jiathis.com/code_mini/jia.js?uid=1344332343487662" charset="utf-8"></script>'
		).append('<div class="clear" />');

		return $jia;
	};

	var createPostListItem = function(post) {
		var $div = createPanel();
		var $panelBody = createPanelBody();
		var $title = createTitleLink(post.title, '/posts/' + post.slug);
		var $time = createTime(UI.convertDateTime(post.create_at));
		var $content = createContent(post.content);
		$panelBody.append($title).append($time).append($content);
		$div.append($panelBody);

		return $div;
	};

	var createPost = function(post) {
		var $div = createPanel();
		var $panelBody = createPanelBody();
		var $title = createTitle(post.title);
		var $time = createTime(UI.convertDateTime(post.create_at));
		var $jia = createJia(post);
		var $content = createContent(post.content);
		$panelBody.append($title).append($time).append($jia).append($content);

		$div.append($panelBody);

		return $div;
	};

	window.UI = window.UI || {};

	window.UI.Post = {
		createPost: createPost,
		createPostListItem: createPostListItem
	};
}(jQuery));
