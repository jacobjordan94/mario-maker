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

function createUserElement(object) {
	let userList = [];
	let userObject = {};

	object.each((i, el) => {
		userObject = {};
		var _$ = cheerio.load(el, {decodeEntities: false});
		userObject.name = _$('.user-wrapper > .user-info > .name').html();
		userObject.url = bookmarkURL + _$('.user-wrapper > .mii-wrapper > .link').attr('href');
		userObject.avatar = _$('.user-wrapper > .mii-wrapper > .link > img').attr('src');
		userList[i] = userObject;
	});

	return (userList.length ? userList : null);
}

function makeJSON(body) {
	let $ = cheerio.load(body, {decodeEntities: false});
	let json = {};
	// var self = this;

	if ($('.rank.nonprize') && $('.rank.nonprize')['0'] && $('.rank.nonprize')['0'].next && $('.rank.nonprize')['0'].next.data)
		json.difficulty = $('.rank.nonprize')['0'].next.data.toLowerCase();
	else
		json.difficulty = null;

	//Clear Rate
	let typ = [];
	$('.clear-rate > .typography').each((i, el) => {
		var cls = $(el).attr('class');
		cls = cls.replace('typography typography-', '');
		cls = cls.replace('second', '.');

		typ[i] = cls;
	});
	typ.pop();
	json.clear_rate = Number(typ.join(''));

	json.title = $('.course-title').html(); // Course Title
	json.created_at = $('.created_at').html(); // Created at
	json.images = {
		thumbnail: $('.course-image > .course-image').attr('src'),
		fullview: $('.course-image-full').attr('src')
	}

	// Creator
	json.creator = {
		name: $('.creator-info > .name').html(),
		url: bookmarkURL + $('.mii-wrapper.creator > .link').attr('href'),
		avatar: $('.mii-wrapper.creator > .link > img').attr('src')
	}

	// Game style
	$('.gameskin.bg-image').each((i, el) => {
		json.gameStyle = el.attribs.class.replace('gameskin bg-image common_gs_', '')
	})

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
	json.world_record = null;
	typ = [];

	$('.fastest-time-wrapper > .clear-time > .typography').each((i, el) =>{
		var cls = $(el).attr('class');
		cls = cls.replace('typography typography-', '');
		cls = cls.replace('minute', ':');
		cls = cls.replace('second', '.');
		typ[i] = cls;
	});

	let worldRecord = $('.fastest-time-wrapper > .user-wrapper > .user-info > .name').html()
	if (worldRecord)
		json.world_record = {
			time: typ.join(''),
			user: {
				name: worldRecord,
				url: bookmarkURL + $('.fastest-time-wrapper > .user-wrapper > .mii-wrapper > .link').attr('href'),
				avatar: $('.fastest-time-wrapper > .user-wrapper > .mii-wrapper > .link > img').attr('src')
			}
		}

	//first clear
	json.first_clearer = null;
	let fc_name = $('.first-user > .body > .user-wrapper > .user-info > .name').html();

	if (fc_name)
		json.first_clearer = {
			name: fc_name,
			url: bookmarkURL + $('.first-user > .body > .user-wrapper > .mii-wrapper > .link').attr('href'),
			avatar: $('.first-user > .body > .user-wrapper > .mii-wrapper > .link > img').attr('src')
		}

	json.recent_players = createUserElement($('.played-body > ul > li'))
	json.cleared_by = createUserElement($('.cleared-body > ul > li'))
	json.starred_by = createUserElement($('.liked-body > ul > li'))

	return json;
}

module.exports = (id, callback=null) => {
	if (callback) {
		request(bookmarkURL + '/courses/' + id, function(error, response, body) {
			if(!error && response.statusCode == 200) {
				let json = makeJSON(body)
				json.response = response
				callback(error, json)
			} else {
				callback(error, response)
			}
		});
	} else {
		let { body, statusCode, responce } = promiseRequest(bookmarkURL + '/courses/' + id);
		if (!responce || statusCode !== 200) return 'Invalid response code';

		let json = makeJSON(body)
		json.response = response
		return json;
	}
}
