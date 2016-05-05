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
					$(selector.posts).append(createPostRow(post));
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

	function createPostRow(post) {
		var $div = $('<div class="post-block panel panel-default" />');

		var $panelBody = $('<div class="panel-body"/>');
		var $title = $('<h3><a href="/posts/' + post.slug + '">' + post.title + '</a></h3>');
		var $time = $('<h6>' + UI.convertDateTime(post.create_at) + '</h6>');
		var $content = $('<div class="post-content">' + post.content + '</div>');
		$panelBody.append($title).append($time).append($content);

		$div.append($panelBody);
		return $div;
	}
}(jQuery));


// <div class="post-block panel panel-default">
// 				<div class="panel-body">
// 					<h3><a href="/post/<%=item.slug%>"><%=item.title%></a></h3>
// 					<h6><%=moment(item.create_at).format(timeFormat1)%></h6>
// 					<div class='post-content'><%-item.content%></div>
// 				</div>
// 			</div>
