'use strict';

(function($) {

	var selector = {
		postForm: '.postForm',
		editor: 'textarea#editor',
		title: '#title',
		slug: '#slug',
		tag: '#tag',
		content: '#content',
		shortDesc: '#shortDesc',
		originalUrl: '#originalUrl',
		source: '#source',
		coverImg: '#coverImg',
		visible: '#visible'
	};

	function getPostObject(id) {
		var postObject = {};
		var valFields = ['title', 'slug', 'content', 'tag', 'originalUrl', 'source', 'shortDesc', 'coverImg'];
		_.each(valFields, function(item) {
			postObject[item] = $.trim($(selector[item]).val());
		});
		postObject.visible = ($(selector.visible)[0].checked ? 1 : 0);
		if (id) {
			postObject.id = id;
		}
		return postObject;
	}

	function checkPostFields() {
		var msg = '';
		var i18nKey = '';
		if (!$.trim($(selector.title).val())) {
			i18nKey = 'fillTitle';
		} else if (!$.trim($(selector.slug).val())) {
			i18nKey = 'fillSlug';
		} else if (!$.trim($(selector.content).val())) {
			i18nKey = 'fillContent';
		}
		if (i18nKey) {
			msg = $.i18n._(i18nKey);
		}
		return msg;
	}

	function setContentFromEditor() {
		$(selector.content).val($(selector.editor).val());
	}

	function setPostForm(post) {
		$(selector.title).val(post.title);
		$(selector.slug).val(post.slug);
		$(selector.shortDesc).val(post.short_desc);
		$(selector.editor).val(post.content);
		$(selector.tag).val(post.tag.join('|'));
		$(selector.coverImg).val(post.cover_img);
		$(selector.source).val(post.source);
		$(selector.originalUrl).val(post.originalUrl);
		$(selector.visible).prop('checked', !!post.visible);
	}

	window.PostForm = {
		selector: selector,
		checkPostFields: checkPostFields,
		getPostObject: getPostObject,
		setContentFromEditor: setContentFromEditor,
		setPostForm: setPostForm
	};

}(jQuery));
