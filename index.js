var request = require('request');
var cheerio = require('cheerio');

class MarioMaker{
	constructor(){
		this._baseURL = 'https://supermariomakerbookmark.nintendo.net/courses/';
	}

	_buildJSON(body){
		var $ = cheerio.load(body, {decodeEntities: false});
		var json = {};
		var typ = [];

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
		
		//Created at
		json.created_at = $('.created_at').html();


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

		//tag
		var tag = $('.course-meta-info > .course-tag').html(); 
		tag = tag == '---' ? null : tag;
		json.tag = tag;

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

var mm = new MarioMaker();
mm.getCourse('FB59-0000-029E-D702', function(error, response, json){
	if(!error && response.statusCode == 200){
		console.dir(json);
	} else {
		console.log(response.statusCode);
	}
});

module.exports = MarioMaker;