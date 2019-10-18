let smmCourse = require('./mario-maker.js');
smmCourse('370D-0000-0253-A432', function(error, json) { // blatantly advertising
	if(!error && json.response.statusCode == 200){
		console.dir(json);
	} else {
		console.log(json);
	}
});

(async () => {
	var json = await smmCourse('370D-0000-0253-A432')
	console.dir(json)
})()
