# mario-maker.js
API for the Super Mario Maker Bookmark website
---
## Installation (requires Node v6 or higher)
```
npm install mario-maker
```

## Setup 
```javascript
var mm = require('mario-maker');
```

## Methods 

### getCourse(course-id)
```
mm.getCourse('AA64-0000-000F-7D4C', function(error, response, json){
	if(!error && response.statusCode == 200){
		console.dir(json);
	} else {
		console.log(response.statusCode);
	}
});
```
_Output_
```
{ difficulty: 'normal',
  clear_rate: 24.04,
  course_title: 'Mission: Impossible',
  course_img: 'https://dypqnhofrd2x2.cloudfront.net/6773-0000-024C-BFBF.jpg',
  course_img_full: 'https://dypqnhofrd2x2.cloudfront.net/6773-0000-024C-BFBF_full.jpg',
  created_at: '06/01/2016',
  creator_name: 'MK8',
  creator_url: 'https://supermariomakerbookmark.nintendo.net/profile/mk8ntd?type=posted',
  creator_img_url: 'http://mii-images.cdn.nintendo.net/3qqr4x4fr31q8_normal_face.png',
  stars: 113095,
  unique_users: 674142,
  shares: 0,
  clears: 495213,
  attempts: 2059332,
  miiverse_url: 'https://miiverse.nintendo.net/posts/AYMHAAACAAADV0Z3g8xSCQ',
  tag: 'Music',
  world_record: 
   { name: 'N-Star',
     time: '01:10.841',
     user_url: 'https://supermariomakerbookmark.nintendo.net/profile/G37_N-STAR?type=posted',
     user_img_url: 'http://mii-images.cdn.nintendo.net/2c07npbmlpa6b_normal_face.png' },
  first_clear: 
   { name: 'Lady Lila',
     user_url: 'https://supermariomakerbookmark.nintendo.net/profile/ladylila?type=posted',
     user_img_url: 'http://mii-images.cdn.nintendo.net/hrek5lec87gl_normal_face.png' },
  recent_players: 
   [ { user_name: 'Jelly',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/Big_Green_Chuchu?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/1uzjebzah9ow7_normal_face.png' },
     { user_name: 'Kyle',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/EllieJT?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/ju53abt48dg4_normal_face.png' },
     { user_name: 'Wiiman',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/N0_cr34t3_4_u?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/2emodbhnbfrij_normal_face.png' },
     { user_name: 'dad',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/daddy_k123456?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/2yl8egrudb8z5_normal_face.png' },
     { user_name: 'πü¿πüåπü╛',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/Toumagou23?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/rx5b2uqpinnl_normal_face.png' },
     ... ]
  cleared_by: 
   [ { user_name: 'Jelly',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/Big_Green_Chuchu?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/1uzjebzah9ow7_normal_face.png' },
     { user_name: 'πü¿πüåπü╛',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/Toumagou23?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/rx5b2uqpinnl_normal_face.png' },
     { user_name: 'nialex',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/fmezacr?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/2hykfdd1w5cek_normal_face.png' },
     { user_name: '├ülvaro',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/alvaroparodia?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/1w10qmm7n0b3j_normal_face.png' },
     { user_name: 'Julio',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/chaparrolkflaco?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/38ht2t81fe3ib_normal_face.png' },
     ... ]
  starred_by: 
   [ { user_name: 'πü¿πüåπü╛',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/Toumagou23?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/rx5b2uqpinnl_normal_face.png' },
     { user_name: '├ülvaro',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/alvaroparodia?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/1w10qmm7n0b3j_normal_face.png' },
     { user_name: 'Julio',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/chaparrolkflaco?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/38ht2t81fe3ib_normal_face.png' },
     { user_name: 'nai',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/shanai2006?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/24dtt5iv6rrqf_normal_face.png' },
     { user_name: 'L0rd V3g4',
       user_url: 'https://supermariomakerbookmark.nintendo.net/profile/D4rk_L0rd_V3g4?type=posted',
       user_img_url: 'http://mii-images.cdn.nintendo.net/8r5knlatqdha_normal_face.png' },
     ... ] 
   }

```
