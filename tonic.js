var mm = require('./mario-maker.js');

mm.getCourse('370D-0000-0253-A432', function(error, json) { // blatantly advertising
	if(!error && json.response.statusCode == 200){
		console.dir(json);
	} else {
		console.log(json);
	}
});

(async () => {
	var json = await mm.getCourseP('370D-0000-0253-A432')
	console.dir(json)
})()
