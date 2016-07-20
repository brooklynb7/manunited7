'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Advice Schema
 */
var AdviceSchema = new Schema({
	name: {
		type: String,
		trim: true,
		default: ''
	},
	email: {
		type: String,
		trim: true,
		default: ''
	},
	advice: {
		type: String,
		trim: true,
		required: 'Advice should not Empty.'
	},
	category: {
		type: Number
	},
	status: {
		type: Number,
		default: 1
	},
	created: {
		type: Date,
		default: Date.now
	}
});

var Advice = mongoose.model('Advice', AdviceSchema);

Advice.schema.path('advice').validate(function(value) {
	return value.length <= 200;
}, 'More then 200 characters');
