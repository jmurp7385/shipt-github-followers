var express = require('express');
var router = express.Router();


/* GET users data. */
router.post('/', function(req, res, next) {
  storage.initSync()
  console.log(req.body.username);
  // if(req.body != {}) {
    storage.setItemSync('handle', req.body.username);
  // }
  //
  var username = storage.getItemSync('handle')
  github.users.getForUser({
    username: username
  }, function (e, r) {
    console.log('start');
    console.log(e);
    var json = JSON.parse(JSON.stringify(r));
    var data = json['data']
    storage.setItemSync('handle', data['login']);
    storage.setItemSync('follower_count', data['followers']);
    console.log('Data Stored:' + '\n\thandle: ' + data['login']+ '\n\tfollower_count: ' + data['followers']);
    getFollowers(req,res,next,data);
  });
});

function getFollowers(req,res,next,data) {
  github.users.getFollowersForUser({
    username: storage.getItemSync('handle')
  }, function(e, r) {
    var json = JSON.parse(JSON.stringify(r));
    var followers = json['data'];
    storage.setItemSync('followers',JSON.stringify(followers));
    var link = json['meta']['link'];
    if (link != null) {
      link = link.split('&page=')[2];
      last_page = link.split('>')[0];
      console.log("lp: "+last_page);
      storage.setItemSync('last_page', last_page+1);
      storage.setItemSync('next_page', 2);
    } else {
      storage.setItemSync('last_page', 1);
      storage.setItemSync('next_page', 1);
    }
    console.log(storage.getItemSync('next_page'));
    console.log(storage.getItemSync('last_page'));
    res.render('users', {
      handle: storage.getItemSync('handle'),
      follower_count: storage.getItemSync('follower_count'),
      followers: JSON.parse(storage.getItemSync('followers')),
      next_page: storage.getItemSync('next_page'),
      last_page: storage.getItemSync('last_page')
    });
  });
}

module.exports = router;
