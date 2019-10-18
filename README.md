# mario-maker.js
API for the Super Mario Maker Bookmark website

## Installation (requires Node v8 or higher)

There are two ways you can install the API: Manually, Automatically (Release) & Automatically (Latest Commit)

- **Manual Installation** Copy the `mario-maker.js` file to your project and require it using the path structure and the require function. While this allows you to keep a manual copy of the Super Mario Maker Bookmark Website API, you will no longer get automatic updates, and will have to manually install each update.
- **Automatic (Release)** Run `npm install super-maker-api` in the Terminal.
- **Automatic (Latest Commit)** Run `npm install Samplasion/mario-maker` in the Terminal.

## Usage

In order to use the Super Mario Maker Bookmark Website API, you will need to require it in the JavaScript file. We recommend assigning a variable to it to avoid requiring the file over and over.

To get a course's information, you will need to have the course-ID available. As a workaround, you can use [an SMM Level DB](http://smm-db.glitch.me/levels/) made by NightYoshi370 to search for courses via their name.

Once you have the course ID, you can then get the information by simply entering it as the first parameter to the variable you assigned above. Callbacks are also supported, the first argument being an error and the second argument being the level information. Of course, callbacks aren't mandatory, and simply requiring the course ID is enough.


## Example

```js
// Without callback
var course = await smmAPI('370D-0000-0253-A432');

// With callback
smmAPI('370D-0000-0253-A432', function(error, course) {
    if(!error && course.response.statusCode == 200){
        // Course was successfully received        
    } else {
        // Something happened and the course wans't received
    }
});
```

### Return value
The value returned will be the course data inside a JSON object. For example, here is the information for `Castello aereo Infernale α/Ω` made by Samplasion (if you'd like to give it a try, the course ID is **370D-0000-0253-A432**)

```js
{
	difficulty: 'expert',
	clear_rate: 4.16,
	title: 'Castello aereo Infernale α/Ω',
	images: {
  		thumbnail: 'https://dypqnhofrd2x2.cloudfront.net/370D-0000-0253-A432.jpg',
		fullCourse: 'https://dypqnhofrd2x2.cloudfront.net/370D-0000-0253-A432_full.jpg'
	}
	created_at: '06/10/2016',
	creator: [USER OBJECT],
	game_style: 'sbu',
	stars: 2,
	unique_users: 59,
	shares: 0,
	clears: 7,
	attempts: 168,
	tag: 'Traditional',
	world_record: {
		time: '02:08.882',
		user: [USER OBJECT]
	},
	first_clear: [USER OBJECT],
	recent_players: [ARRAY OF USER OBJECTS],
	cleared_by: [ARRAY OF USER OBJECTS],
	starred_by: [ARRAY OF USER OBJECTS]
}
```

### User Object

The user object consists of the name, url and avatar (and their keys respectively). As an example, here's Samplasion's user object:

```js
{
	name: 'Samplasion',
	url: 'https://supermariomakerbookmark.nintendo.net/profile/Samplasion?type=posted',
	avatar: 'http://mii-images.cdn.nintendo.net/jmuybnozbxfm_normal_face.png'
}
```

## Credits

- **Samplasion** - Developer of the Super Mario Maker Bookmark Website API
- **NightYoshi370** - Making callbacks optional, creating this ReadME
