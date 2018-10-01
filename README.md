# mario-maker.js
API for the Super Mario Maker Bookmark website (or, at least, my take on it XD)
---
## Installation (requires Node v6 or higher)
```
npm install mario-maker
```

## Setup
```javascript
var mm = require('super-maker-api');
```

## Methods

### getCourse(course-id, callback)

```js
// Error-first callback that can be promisified
mm.getCourse('370D-0000-0253-A432', function(error, json) {
	if(!error && json.response.statusCode == 200){
		console.dir(json);
	} else {
		console.log(json.statusCode);
	}
});

```

### getCourse(course-id)

```js
// Promise-ready
await mm.getCourseP('370D-0000-0253-A432')
```
## _Output_

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
