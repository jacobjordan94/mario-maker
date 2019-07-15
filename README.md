# mario-maker.js
API for the Super Mario Maker Bookmark website

## Installation (requires Node v8 or higher)

There are two ways you can install the API: Manually, Automatically (Release) & Automatically (Latest Commit)

- **Manual Installation** Copy the `mario-maker.js` file to your project and require it using the path structure and the require function. While this allows you to keep a manual copy of the Super Mario Maker Bookmark Website API, you will no longer get automatic updates, and will have to manually install each update.
- **Automatic (Release)** Run `npm install super-maker-api` in the Terminal.
- **Automatic (Latest Commit)** Run `npm install Samplasion/mario-maker` in the Terminal

## Usage

In order to use the Super Mario Maker Bookmark Website API, you will need to require it in the JavaScript file and assign a variable to it.

To get a course's information, you will need to have the course-ID available. As a workaround, you can use [an SMM Level DB](http://smm-db.glitch.me/levels/) made by NightYoshi370 to search for courses via their name.

Once you have the course ID, you can then get the information by simply entering it as the first parameter to the variable you assigned above. Callbacks are also supported, the first argument being an error and the second argument being the levels information. Of course, callbacks aren't mandatory, and simply requiring the course ID is enough.


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
{ difficulty: 'expert',
  clear_rate: 4.16,
  course_title: 'Castello aereo Infernale α/Ω',
  course_img:
   'https://dypqnhofrd2x2.cloudfront.net/370D-0000-0253-A432.jpg',
  course_img_full:
   'https://dypqnhofrd2x2.cloudfront.net/370D-0000-0253-A432_full.jpg',
  created_at: '06/10/2016',
  creator_name: 'Samplasion',
  creator_url:
   'https://supermariomakerbookmark.nintendo.net/profile/Samplasion?type=posted',
  creator_img_url:
   'http://mii-images.cdn.nintendo.net/jmuybnozbxfm_normal_face.png',
  game_style_raw: 'sbu',
  game_style: 'New Super Mario Bros. U',
  stars: 2,
  unique_users: 59,
  shares: 0,
  clears: 7,
  attempts: 168,
  tag: 'Traditional',
  world_record:
   { name: 'はる',
     time: '02:08.882',
     user_url:
      'https://supermariomakerbookmark.nintendo.net/profile/AKANWO?type=posted',
     user_img_url:
      'http://mii-images.cdn.nintendo.net/3pkdfvh1ue35g_normal_face.png' },
  first_clear:
   { name: 'Krita',
     user_url:
      'https://supermariomakerbookmark.nintendo.net/profile/qwerty123uhbba?type=posted',
     user_img_url:
      'http://mii-images.cdn.nintendo.net/3jik044thblfo_normal_face.png' },
  recent_players:
   [ { user_name: 'Matthew',
       user_url:
        'https://supermariomakerbookmark.nintendo.net/profile/EliteGruntHero?type=posted',
       user_img_url:
        'http://mii-images.cdn.nintendo.net/hlb583qc9ijv_normal_face.png' },
     { user_name: 'Frappe38',
       user_url:
        'https://supermariomakerbookmark.nintendo.net/profile/RobyKenCha83?type=posted',
       user_img_url:
        'http://mii-images.cdn.nintendo.net/2levey0q18nw8_normal_face.png' },
     { user_name: 'てつろ',
       user_url:
        'https://supermariomakerbookmark.nintendo.net/profile/tet226?type=posted',
       user_img_url:
        'http://mii-images.cdn.nintendo.net/2hd3r29og2sgh_normal_face.png' },
     { user_name: 'Atomsk',
       user_url:
        'https://supermariomakerbookmark.nintendo.net/profile/Mujihi?type=posted',
       user_img_url:
        'http://mii-images.cdn.nintendo.net/17t8c5icoscx_normal_face.png' },
     { user_name: 'Joseph',
       user_url:
        'https://supermariomakerbookmark.nintendo.net/profile/Ninja_Boy4ever?type=posted',
       user_img_url:
        'http://mii-images.cdn.nintendo.net/2lfeqzyfyd0h5_normal_face.png' },
     ... ],
  cleared_by:
   [ { user_name: 'Ethan',
       user_url:
        'https://supermariomakerbookmark.nintendo.net/profile/Dogmeat99?type=posted',
       user_img_url:
        'http://mii-images.cdn.nintendo.net/sbv8airwymhq_normal_face.png' },
     { user_name: 'darby a',
       user_url:
        'https://supermariomakerbookmark.nintendo.net/profile/darbyantle?type=posted',
       user_img_url:
        'http://mii-images.cdn.nintendo.net/1da4k0dad2lgq_normal_face.png' },
     { user_name: 'あつやともき',
       user_url:
        'https://supermariomakerbookmark.nintendo.net/profile/tomokin4989?type=posted',
       user_img_url:
        'http://mii-images.cdn.nintendo.net/1h3fucrtxy699_normal_face.png' },
     { user_name: 'Rana★O~O"',
       user_url:
        'https://supermariomakerbookmark.nintendo.net/profile/ZenithTyme?type=posted',
       user_img_url:
        'http://mii-images.cdn.nintendo.net/11ec1gi3lwo0_normal_face.png' },
     { user_name: 'Diego',
       user_url:
        'https://supermariomakerbookmark.nintendo.net/profile/luichi86?type=posted',
       user_img_url:
        'http://mii-images.cdn.nintendo.net/37n51tsva3j9x_normal_face.png' } ],
  starred_by:
   [ { user_name: 'darby a',
       user_url:
        'https://supermariomakerbookmark.nintendo.net/profile/darbyantle?type=posted',
       user_img_url:
        'http://mii-images.cdn.nintendo.net/1da4k0dad2lgq_normal_face.png' },
     { user_name: 'Krita',
       user_url:
        'https://supermariomakerbookmark.nintendo.net/profile/qwerty123uhbba?type=posted',
       user_img_url:
        'http://mii-images.cdn.nintendo.net/3jik044thblfo_normal_face.png' } ],
		 response: {...} // a response object
   }
```

## Credits

- **Samplasion** - Developer of the Super Mario Maker Bookmark Website API
- **NightYoshi370** - Making callbacks optional, creating this ReadME
