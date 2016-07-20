'use strict';

(function($) {

	var selector = {
		adviceTable: '.table',
		adviceList: '.adviceList',
		paginate: '.paginate'
	};

	$(document).ready(function() {
		loadAdviceList({}, 1, 20);
	});

	function loadAdviceList(queryObj, page, size) {
		UI.BlockUI.show(selector.adviceTable);
		queryObj.page = page;
		queryObj.size = size;
		Service.getAllAdvice(queryObj)
			.done(function(adviceList) {
				$(selector.adviceList).empty();
				$.each(adviceList.advice, function() {
					$(selector.adviceList).append(createAdviceItem(this));
				});
				$(selector.paginate).empty().append(UI.Pagination.show({
					total: adviceList.count,
					size: adviceList.size,
					current: adviceList.page,
					cb: function(page, size) {
						loadAdviceList(queryObj, page, size);
					}
				}));
			})
			.fail(function(jqXHR) {
				UI.notifyErrorGlobal(jqXHR.responseJSON.msg);
			})
			.always(function() {
				UI.BlockUI.hide(selector.adviceTable);
			});
	}

	function createAdviceItem(item) {
		var $tr = $('<tr id="' + item._id + '" />');
		$tr
			.append($('<td>' + item.advice + '</td>'))
			.append($('<td>' + item.name + '</td>'))
			.append($('<td>' + item.email + '</td>'))
			.append($('<td>' + UI.convertDateTime(item.created) + '</td>'))
			.append($('<td ／>').append(createRemoveLink(item)));
		return $tr;
	}

	function createRemoveLink(item) {
		var $a = $('<a href="javascript:void(0)">删除</a>');
		$a.on('click', function() {
			var $html = $(_.template($('#removeAdviceTpl').html())());

			UI.Modal.confirm({
				title: '意见删除',
				html: $html,
				confirm: function($modal) {
					UI.BlockUI.show('.modal-content');
					Service.removeAdvice(item._id)
						.done(function() {
							$modal.modal('hide');
							$('#' + item._id).remove();
							UI.notifySuccessGlobal('意见删除成功');
						})
						.fail(function(jqXHR) {
							$modal.modal('hide');
							UI.notifyErrorGlobal(jqXHR.responseJSON.msg);
						})
						.always(function() {
							UI.BlockUI.hide('.modal-content');
						});
				}
			});
		});
		return $a;
	}

}(jQuery));
