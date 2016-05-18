'use strict';

/**
 * Module dependencies.
 */
let mongoose = require('mongoose'),
	Post = mongoose.model('Post'),
	_ = require('lodash'),
	moment = require('moment'),
	config = require('./config'),
	wechat = require('wechat'),
	API = require('wechat-api'),
	api = new API(config.wechat.appId, config.wechat.appSecret),
	menuButton = config.wechat.menuButton;

let handleTodayPostList = (res) => {
	var condition = {
		visible: 1,
		'create_at': {
			$gte: new Date(moment().format('YYYY-MM-DD 00:00:00')).getTime(),
			$lt: new Date(moment().add(1, 'days').format('YYYY-MM-DD 00:00:00')).getTime()
		}
	};
	var projection = 'title cover_img slug';
	var options = {
		limit: 5,
		sort: {
			'create_at': -1
		}
	};
	Post.find(condition, projection, options, function(err, posts) {
		if (err) {
			console.log(err);
			res.reply('');
		} else {
			if (posts.length === 0) {
				res.reply('暂无内容');
			} else {
				var msgList = [];
				for (var i = 0; i < posts.length; i++) {
					msgList.push({
						title: posts[i].title,
						description: '',
						picurl: posts[i].cover_img || (config.wechat.host + '/static/images/logo.jpg'),
						url: config.wechat.host + '/posts/' + posts[i].slug
					});
				}
				res.reply(msgList);
			}
		}
	});
};

var MessageHandler = function(wechatUser, message, response) {
	this.wechatUser = wechatUser;
	this.message = message;
	this.res = response;
};

MessageHandler.prototype.isSubscribeEvent = function() {
	var message = this.message;
	if (message.MsgType === config.wechat.msgType.event &&
		message.Event === config.wechat.event.subscribe) {
		return true;
	} else {
		return false;
	}
};

MessageHandler.prototype.is_scan_event = function() {
	if (this.message.MsgType === config.wechat.msgType.event &&
		this.message.Event === config.wechat.event.scan) {
		return true;
	} else {
		return false;
	}
};

MessageHandler.prototype.is_location_event = function() {
	if (this.message.MsgType === config.wechat.msgType.location) {
		return true;
	} else {
		return false;
	}
};

MessageHandler.prototype.isNormalText = function() {
	if (this.message.MsgType === config.wechat.msgType.text) {
		return true;
	} else {
		return false;
	}
};

MessageHandler.prototype.isMenuClick = function() {
	if (this.message.MsgType === config.wechat.msgType.event &&
		this.message.Event === config.wechat.event.click) {
		return true;
	} else {
		return false;
	}
};

MessageHandler.prototype.handleSubscribeEvent = function() {
	this.res.reply(config.wechat.subscribeMsg);
};

MessageHandler.prototype.handleMenuClick = function() {
	var eventKey = this.message.EventKey;
	var msg = '';

	// switch (eventKey) {
	// 	case menuButton.angency.key:
	// 		msg = menuButton.angency.msg;
	// 		break;
	// 	default:
	// 		break;
	// }
	this.res.reply(msg);
};

MessageHandler.prototype.handleNormalTextEvent = function() {
	var msg = this.message.Content;
	if (msg.toLowerCase() === 'today') {
		handleTodayPostList(this.res);
	} else {
		this.responseEmpty();
	}
};

MessageHandler.prototype.handleScanEvent = function() {
	var that = this;
	var sceneId = this.message.EventKey;
};

MessageHandler.prototype.responseEmpty = function() {
	this.res.reply('');
};

function handleMessage(handler) {
	switch (true) {
		case handler.isSubscribeEvent():
			handler.handleSubscribeEvent();
			break;
		case handler.isMenuClick():
			handler.handleMenuClick();
			break;
		case handler.isNormalText():
			handler.handleNormalTextEvent();
			break;
		default:
			handler.responseEmpty();
			break;
	}
}

var handler = new MessageHandler();

exports.index = wechat(config.wechat.token, function(req, res, next) {
	// 微信输入信息都在req.wechat上
	var message = req.weixin;
	handler.res = res;
	handler.message = message;
	handleMessage(handler);
});

exports.createMenu = function(req, res) {
	api.createMenu({
		'button': [{
			'type': 'view',
			'name': menuButton.posts.name,
			'url': menuButton.posts.url
		}, {
			'type': 'view',
			'name': menuButton.reds.name,
			'url': menuButton.reds.url
		}]
	}, function(err, rst) {
		res.send(rst);
	});
};

exports.test = function(req, res) {
	res.send('Wechat Api');
};
