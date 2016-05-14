'use strict';
(function($) {

	var generateEllipsisLink = function() {
		return $('<li class="disabled"><a href="javascript:void(0);">...</a></li>');
	};

	var publishPaginationEvent = function(page, size, cb) {
		return function() {
			cb(page, size);
		};
	};

	var createFirstLink = function(page, size, cb) {
		return $('<li/>')
			.append($(
					'<a href="javascript:void(0);" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>'
				)
				.on('click', publishPaginationEvent(page, size, cb)));
	};

	var createLastLink = function(page, size, cb) {
		return $('<li/>')
			.append($(
					'<a href="javascript:void(0);" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>'
				)
				.on('click', publishPaginationEvent(page, size, cb)));
	};

	var createPagination = function(options) {
		var total = options.total;
		var size = options.size;
		var currentPage = options.current;
		var cb = options.cb;

		var $ul = $('<ul class="pagination" />');
		if (total > 0) {
			var pages = Math.ceil(total / size);
			var page_start = currentPage - 2 > 0 ? currentPage - 2 : 1;
			var page_end = page_start + 4 >= pages ? pages : page_start + 4;

			var $firstLink = createFirstLink(1, size, cb);

			if (currentPage === 1) {
				$firstLink.addClass('disabled');
			}
			$ul.append($firstLink);

			if (page_start > 1) {
				$ul.append(generateEllipsisLink());
			}

			for (var i = page_start; i <= page_end; i++) {
				var $link = $('<li/>')
					.append($('<a href="javascript:void(0);">' + i + '</a>').on('click',
						publishPaginationEvent(i, size, cb)));
				if (i === currentPage) {
					$link.addClass('active disabled');
				}
				$ul.append($link);
			}

			if (page_end < pages) {
				$ul.append(generateEllipsisLink());
			}

			var $lastLink = createLastLink(pages, size, cb);

			if (currentPage === pages) {
				$lastLink.addClass('disabled');
			}
			$ul.append($lastLink);

			return $ul;
		}
	};

	window.UI = window.UI || {};

	window.UI.Pagination = {
		show: createPagination
	};
}(jQuery));
