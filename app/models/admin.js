'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Admin Schema
 */
var AdminSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		default: ''
	},
	create_time: {
		type: Number,
		default: Date.now
	}
}, {
	collection: 'admin'
});

var Admin = mongoose.model('Admin', AdminSchema);
