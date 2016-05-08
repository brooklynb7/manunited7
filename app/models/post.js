'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Post Schema
 */
var PostSchema = new Schema({
	title: {
		type: String,
		default: ''
	},
	content: {
		type: String,
		default: ''
	},
	originalUrl: {
		type: String,
		default: ''
	},
	short_desc: {
		type: String,
		default: ''
	},
	slug: {
		type: String,
		default: ''
	},
	source: {
		type: String,
		default: ''
	},
	tag: {
		type: [String],
		default: []
	},
	comments: {
		type: Number,
		default: 0
	},
	view: {
		type: Number,
		default: 0
	},
	like: {
		type: Number,
		default: 0
	},
	visible: {
		type: Number,
		default: 1
	},
	create_at: {
		type: Number,
		default: Date.now
	}
}, {
	collection: 'post'
});

var Post = mongoose.model('Post', PostSchema);
