var express = require('express');
var router = express.Router();
var GitHubApi = require("github");
var github = new GitHubApi({
  
});

/* GET users data. */
router.post('/', function(req, res, next) {
  github.users.getForUser({
    username: req.body.username
  }, function (e, r) {
    var json = JSON.parse(JSON.stringify(r));
    var data = json['data']    
    console.log(data['login'],data['followers']);    
    getFollowers(req,res,next,data);    
    // res.render('users', {handle: data['login'], follower_count: data['followers'], userdata: data});
  });
  
});

function getFollowers(req,res,next,data) {
  github.users.getFollowersForUser({
    username: data['login']
  }, function(e, r) {
    var json = JSON.parse(JSON.stringify(r));
    var followers = json['data'];
    if (github.hasNextPage(r)) {
            github.getNextPage(r, function(err, res) {
                followers += JSON.parse(JSON.stringify(res))['data'];
            });
        }
    res.render('users', {handle: data['login'], follower_count: data['followers'], followers: followers});
  });
}

module.exports = router;
