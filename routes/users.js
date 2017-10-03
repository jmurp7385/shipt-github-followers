var express = require('express');
var router = express.Router();


/* GET users data. */
router.post('/', function(req, res, next) {
  storage.initSync()
  // Search username and save necessary data
  if(req.body.username) {
    storage.setItemSync('handle', req.body.username);
    var username = storage.getItemSync('handle')
    github.users.getForUser({
      username: username
    }, function (e, r) {
      if (e) {
        e.status = 'User: "' + req.body.username + '" ' + e.status;
        res.render('error',{error: e});
      } else {
        var json = JSON.parse(JSON.stringify(r));
        var data = json['data']
        storage.setItemSync('handle', data['login']);
        storage.setItemSync('follower_count', data['followers']);
        storage.setItemSync('avatar', data['avatar_url']);
        getFollowers(req,res,next,data);
      }
    });
  } else {
    res.redirect('/');
  }
});

// get followers for the searched user
function getFollowers(req,res,next,data) {
  github.users.getFollowersForUser({
    username: storage.getItemSync('handle')
  }, function(e, r) {
    if(e) {
      console.log(e);
    }
    var json = JSON.parse(JSON.stringify(r));
    // pull first batch of followers from json response
    var followers = json['data'];
    storage.setItemSync('followers',JSON.stringify(followers));
    // get the range of pages of followers
    var link = json['meta']['link'];
    if (link != null) {
      link = link.split('&page=')[2];
      last_page = link.split('>')[0];
      storage.setItemSync('last_page', last_page+1);
      storage.setItemSync('next_page', 2);
    } else {
      storage.setItemSync('last_page', 1);
      storage.setItemSync('next_page', 1);
    }

    res.render('users', {
      handle: storage.getItemSync('handle'),
      follower_count: storage.getItemSync('follower_count'),
      avatar: storage.getItemSync('avatar'),
      followers: JSON.parse(storage.getItemSync('followers')),
      next_page: storage.getItemSync('next_page'),
      last_page: storage.getItemSync('last_page')
    });
  });
}

module.exports = router;
