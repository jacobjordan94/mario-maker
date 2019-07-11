//            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//                    Version 2, December 2004
//
// Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
//
// Everyone is permitted to copy and distribute verbatim or modified
// copies of this license document, and changing it is allowed as long
// as the name is changed.
//
//            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
//
//  0. You just DO WHAT THE FUCK YOU WANT TO.


/*
 * by Jacob Jordan (@JacobAJordan_)
 * jacobjordan94@live.com
 */

const request = require('request');
const cheerio = require('cheerio');

const { promisify } = require("util");
const promiseRequest = promisify(request);

const bookmarkURL = 'https://supermariomakerbookmark.nintendo.net';

function makeJSON(body) {
	var $ = cheerio.load(body, {decodeEntities: false});
	var json = {};
	var typ = [];
	var users = [];
	// var self = this;

	json.difficulty = $('.rank.nonprize')['0'].next.data.toLowerCase(); // Difficulty

	//Clear Rate
	$('.clear-rate > .typography').each((i, el) => {
		var cls = $(el).attr('class');
		cls = cls.replace('typography typography-', '');
		cls = cls.replace('second', '.');

		typ[i] = cls;
	});
	typ.pop();
	json.clear_rate = Number(typ.join(''));

	json.course_title = $('.course-title').html(); // Course Title
	json.course_img = $('.course-image > .course-image').attr('src'); // course image
	json.course_img_full = $('.course-image-full').attr('src'); // course image full
	json.created_at = $('.created_at').html(); // Created at

	//user
	json.creator_name = $('.creator-info > .name').html();
	json.creator_url = profileURL + $('.mii-wrapper.creator > .link').attr('href');
	json.creator_img_url = $('.mii-wrapper.creator > .link > img').attr('src');

	var getGS = (gs) => {
		switch (gs) {
			case "sb":
				return "Super Mario Bros."
			case "sb3":
				return "Super Mario Bros. 3"
			case "sw":
				return "Super Mario World"
			case "sbu":
				return "New Super Mario Bros. U"
		}
	}
	// Game style
	var gs = ""
	var gsr = ""
	$('.gameskin.bg-image').each((i, el) => {
		gsr = el.attribs.class.replace('gameskin bg-image common_gs_', '')
		gs = getGS(gsr)
	})
	json.game_style_raw = gsr
	json.game_style = gs;

	//Stars
	typ = [];
	$('.liked-count > .typography').each((i, el) => {
		var cls = $(el).attr('class');
		cls = cls.replace('typography typography-', '');
		typ[i] = cls;
	});
	json.stars = Number(typ.join(''));

	//Unique users
	typ = [];
	$('.played-count > .typography').each((i, el) => {
		var cls = $(el).attr('class');
		cls = cls.replace('typography typography-', '');
		typ[i] = cls;
	});
	json.unique_users = Number(typ.join(''));

	//number of shares
	typ = [];
	$('.shared-count > .typography').each((i, el) => {
		var cls = $(el).attr('class');
		cls = cls.replace('typography typography-', '');
		typ[i] = cls;
	});
	json.shares = Number(typ.join(''));

	//clears and attempts
	$('.tried-count > .typography').each((i, el) => {
		var cls = $(el).attr('class');
		cls = cls.replace('typography typography-', '');
		typ[i] = cls;
	});
	var x = typ.join('');
	json.clears = Number(x.split('slash')[0]);
	json.attempts = Number(x.split('slash')[1]);

	//tag
	var tag = $('.course-meta-info > .course-tag').html();
	tag = tag == '---' ? null : tag;
	json.tag = tag;

	//world record
	json.world_record = {};
	typ = [];

	var wr_name = $('.fastest-time-wrapper > .user-wrapper > .user-info > .name').html();
	$('.fastest-time-wrapper > .clear-time > .typography').each((i, el) =>{
		var cls = $(el).attr('class');
		cls = cls.replace('typography typography-', '');
		cls = cls.replace('minute', ':');
		cls = cls.replace('second', '.');
		typ[i] = cls;
	});
	var wr_time = typ.join('');
	var wr_url = $('.fastest-time-wrapper > .user-wrapper > .mii-wrapper > .link').attr('href');
	wr_url = profileURL + wr_url;
	var wr_img_url = $('.fastest-time-wrapper > .user-wrapper > .mii-wrapper > .link > img').attr('src');
	json.world_record.name = wr_name;
	json.world_record.time = wr_time;
	json.world_record.user_url = wr_url;
	json.world_record.user_img_url = wr_img_url;
	if(json.world_record.name === ''){
		json.world_record = null;
	}

	//first clear
	json.first_clear = {};
	var fc_name = $('.first-user > .body > .user-wrapper > .user-info > .name').html();
	var fc_img_url = $('.first-user > .body > .user-wrapper > .mii-wrapper > .link > img').attr('src');
	var fc_url = $('.first-user > .body > .user-wrapper > .mii-wrapper > .link').attr('href');
	fc_url = profileURL + fc_url;
	json.first_clear.name = fc_name;
	json.first_clear.user_url = fc_url;
	json.first_clear.user_img_url = fc_img_url;
	if(json.first_clear.name === ''){
		json.first_clear = null;
	}

	//recent players
	$('.played-body > ul > li').each((i, el) => {
		var obj = {};
		var _$ = cheerio.load(el, {decodeEntities: false});
		obj.user_name = _$('.user-wrapper > .user-info > .name').html();
		var rp_url = _$('.user-wrapper > .mii-wrapper > .link').attr('href');
		obj.user_url = profileURL + rp_url;
		obj.user_img_url = _$('.user-wrapper > .mii-wrapper > .link > img').attr('src');
		users[i] = obj;
	});
	json.recent_players = users;
	if(json.recent_players.length === 0){
		json.recent_players = null;
	}

	//cleared by
	users = [];
	$('.cleared-body > ul > li').each((i, el) => {
		var obj = {};
		var _$ = cheerio.load(el, {decodeEntities: false});
		obj.user_name = _$('.user-wrapper > .user-info > .name').html();
		var rp_url = _$('.user-wrapper > .mii-wrapper > .link').attr('href');
		obj.user_url = profileURL + rp_url;
		obj.user_img_url = _$('.user-wrapper > .mii-wrapper > .link > img').attr('src');
		users[i] = obj;
	});
	json.cleared_by = users;
	if(json.cleared_by.length === 0){
		json.cleared_by = null;
	}

	//starred by
	users = [];
	$('.liked-body > ul > li').each((i, el) => {
		var obj = {};
		var _$ = cheerio.load(el, {decodeEntities: false});
		obj.user_name = _$('.user-wrapper > .user-info > .name').html();
		var rp_url = _$('.user-wrapper > .mii-wrapper > .link').attr('href');
		obj.user_url = profileURL + rp_url;
		obj.user_img_url = _$('.user-wrapper > .mii-wrapper > .link > img').attr('src');
		users[i] = obj;
	});
	json.starred_by = users;
	if(json.starred_by.length === 0){
		json.starred_by = null;
	}

	return json;
}

module.exports = (id, callback=null) => {
	if (callback) {
		request({url: bookmarkURL + '/courses/' + id, json: true}, function(error, response, body) {
			if(!error && response.statusCode == 200) {
				json.response = response
				callback(error, json)
			} else {
				callback(error, response)
			}
		});
	} else {
		let { body, statusCode, responce } = promiseRequest({url: bookmarkURL + '/courses/' + id, json: true});
		if (!responce || statusCode !== 200) return 'Invalid response code';
		return body;
	}
}
