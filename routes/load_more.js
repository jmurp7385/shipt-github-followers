var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  storage.initSync();
  console.log('Loading more...');
  var followers = JSON.parse(storage.getItemSync('followers'));
  var next_page = storage.getItemSync('next_page');
  console.log(next_page);
  var last_page = storage.getItemSync('last_page');
  if(next_page <= last_page) {
    github.users.getFollowersForUser({
      username: storage.getItemSync('handle'),
      page: next_page
    }, function(e,r){
        var json = JSON.parse(JSON.stringify(r));
        var new_followers = json['data'];
        new_followers.forEach(function (follower) {
          followers.push(follower);
        });
        storage.setItemSync('followers', JSON.stringify(followers));
        storage.setItemSync('next_page', next_page+1);
        res.render('users', {
          handle: storage.getItemSync('handle'),
          follower_count: storage.getItemSync('follower_count'),
          followers: followers,
          avatar: storage.getItemSync('avatar'),
          next_page: storage.getItemSync('next_page'),
          last_page: storage.getItemSync('last_page')
        });
    });
  }
});

module.exports = router;
