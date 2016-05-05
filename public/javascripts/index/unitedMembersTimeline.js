'use strict';

(function($) {

	var selector = {
		timeline: '.united-members-timeline'
	};

	$(document).ready(function() {
		loadUnitedMembersTimeline();
	});

	function loadUnitedMembersTimeline() {
		UI.BlockUI.show();
		Service.getTwitterUnitedMembersTimeline()
			.done(function(rst) {
				$(selector.timeline).empty();
				_.each(rst, function(item) {
					$(selector.timeline).append(createTimelineRow(item));
				});
			})
			.fail(function(jqXHR) {
				console.log(jqXHR);
			})
			.always(function() {
				UI.BlockUI.hide();
			});
	}

	function createTimelineRow(timeline) {
		var $div = $('<div class />');

		var $imgDiv = $('<div class="pull-left" />');
		var $img = $('<img class="img-rounded profile-image" src="' + timeline.user.profile_image_url + '" />');
		$imgDiv.append($img);

		var $textDiv = $('<div class="pull-left col-xs-10 col-sm-11" />');
		var $userName = $('<div class="user-name">' + timeline.user.name + '</div>');
		var $time = $('<span class="time">' + moment(new Date(timeline.created_at)).format('YYYY-MM-DD hh:mm') + '</span>');
		$userName.append($time);
		var $text = $('<p class="pre-wrap-text text">' + timeline.text + '</p>');
		$textDiv.append($userName).append($text);

		$div.append($imgDiv).append($textDiv).append('<div class="clear" />');

		return $div;
	}
}(jQuery));
