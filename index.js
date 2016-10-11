//            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//                    Version 2, December 2004

// Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

// Everyone is permitted to copy and distribute verbatim or modified
// copies of this license document, and changing it is allowed as long
// as the name is changed.

//            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

//  0. You just DO WHAT THE FUCK YOU WANT TO.


/*
 * by Jacob Jordan (@JacobAJordan_)
 * jacobjordan94@live.com 
 */


var request = require('request');
var cheerio = require('cheerio');

class MarioMaker{
	constructor(){
		this._baseURL = 'https://supermariomakerbookmark.nintendo.net/courses/';
		this._profileURL = 'https://supermariomakerbookmark.nintendo.net';
	}

	_buildJSON(body){
		var $ = cheerio.load(body, {decodeEntities: false});
		var json = {};
		var typ = [];
		var users = [];
		var self = this;

		//Difficulty
		json.difficulty = $('.rank.nonprize')['0'].next.data.toLowerCase();

		//Clear Rate
		$('.clear-rate > .typography').each((i, el) => {
			var cls = $(el).attr('class');
			cls = cls.replace('typography typography-', '');
			cls = cls.replace('second', '.');

			typ[i] = cls;
		});
		typ.pop();
		json.clear_rate = Number(typ.join(''));

		//Course Title 
		json.course_title = $('.course-title').html();

		//course image
		json.course_img = $('.course-image > .course-image').attr('src');

		//course image full
		json.course_img_full = $('.course-image-full').attr('src');

		//Created at
		json.created_at = $('.created_at').html();

		//user
		json.creator_name = $('.creator-info > .name').html();
		json.creator_url = this._profileURL + $('.mii-wrapper.creator > .link').attr('href');
		json.creator_img_url = $('.mii-wrapper.creator > .link > img').attr('src');


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
		var clears = x.split('slash')[0];
		var attempts = x.split('slash')[1];
		json.clears = Number(clears);
		json.attempts = Number(attempts);

		//miiverse
		json.miiverse_url = $('.button.miiverse.link').attr('href');

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
		wr_url = this._profileURL + wr_url;
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
		fc_url = this._profileURL + fc_url; 
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
			obj.user_url = this._profileURL + rp_url;
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
			obj.user_url = this._profileURL + rp_url;
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
			obj.user_url = this._profileURL + rp_url;
			obj.user_img_url = _$('.user-wrapper > .mii-wrapper > .link > img').attr('src');
			users[i] = obj;
		});
		json.starred_by = users;
		if(json.starred_by.length === 0){
			json.starred_by = null;
		}

		return json;
	}

	_buildClearRate(){

	}

	getCourse(id, callback){
		var courseURL = this._baseURL + id;
		var self = this;
		request(courseURL, function(error, response, body){
			if(!error && response.statusCode == 200){
				var json = self._buildJSON(body);
				callback(error, response, json);
			} else {	
				callback(error, response, json); 
			}
		});
	}
}

module.exports = MarioMaker;
