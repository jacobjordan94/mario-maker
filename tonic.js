// Change Node version to Node6
var mm = require('mario-maker');

mm.getCourse('6773-0000-024C-BFBF', function(error, response, json){
	if(!error && response.statusCode == 200){
		console.dir(json);
	} else {
		console.log(response.statusCode);
	}
});
