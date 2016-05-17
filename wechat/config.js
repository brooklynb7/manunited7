'use strict';

var wechatConfig = require('./config.wechat');
var OAuth = require('wechat-oauth');
var client = new OAuth(wechatConfig.appId, wechatConfig.appSecret);

var createWechatOAuthUrl = function(cbUrlPath) {
	return client.getAuthorizeURL(wechatConfig.host + '/auth/wechat?cb=' +
		encodeURIComponent(wechatConfig.url + cbUrlPath), '1', 'snsapi_userinfo');
};

module.exports = {
	wechat: {
		host: wechatConfig.host,
		port: 9100,
		token: wechatConfig.token,
		appId: wechatConfig.appId,
		appSecret: wechatConfig.appSecret,
		account: wechatConfig.account,
		msgType: {
			event: 'event',
			text: 'text',
			location: 'location'
		},
		event: {
			subscribe: 'subscribe',
			click: 'CLICK',
			view: 'VIEW',
			scan: 'SCAN'
		},
		mp_url: 'https://mp.weixin.qq.com/',
		mp_login_url: 'https://mp.weixin.qq.com/cgi-bin/login?lang=zh_CN',
		subscribeMsg: '感谢您的关注，我们将竭诚为您提供来自曼联的第一手资讯！\n\n' +
			'回复 today , 获取当天最新发布的讯息！\n\n' +
			'更多内容请访问<a href="http://www.manunited7.com/">www.manunited7.com</a>！',
		menuButton: {
			parentMenu: {
				name: 'ParentMenu'
			},
			linkMenu: {
				name: 'linkMenu',
				url: createWechatOAuthUrl('/appurl')
			}
		}
	}
};
