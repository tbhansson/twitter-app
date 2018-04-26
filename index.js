var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'rolWqTrTvtT6ZYzdvstQnaaxv',
  consumer_secret: 'GKn6E62ZdZZQyr1KM1FO54XGTVoAmNSrdIH6xkhFaKRxV0UoXv',
  access_token_key: '421751974-XMx0ZO48iEEm1FBUyxGbqiC6rmCRQPmFfQfxAk9m',
  access_token_secret: '87AuNWjyNZ7by9qLkO3BhI8DfarSI6wDYbzKyG4Qz01Pv'
});

var params = {screen_name: 'rexim90'};
var one_way_following = [];
var users_to_display = [];
// Gets my followers
client.get('followers/ids', params, function(error, followers_start, response) {
  if (error)
    throw error;
  var followers = followers_start.ids;
  console.log(followers)
//Get who I follow
  client.get('friends/ids', params, function(error, following_start, response){
    if (error)
      throw error;
    var following = following_start.ids;
//Go through each I follow and work it's way through.
    following.forEach(function(person){
      if (followers.indexOf(person) === -1) {
        one_way_following.push(person);
      }

//Slices off so I only get 100 people since that is max.
    one_way_following = one_way_following.slice(0, 99);
// Then I have to make it a string.
    var one_way_following_string = one_way_following.join();
// WHY THE FUCK WONT YOU FUCKING WORK FUCKING FUCK FUCK!
    client.get("users/lookup", {user_id: one_way_following_string}, function(error, users, response){
// console.log(users);
      users.forEach(function(user){
        var userObject = {
          name:user.name,
          screen_name: user.screen_name,
        };
      users_to_display.push(userObject);
      });
      console.log(users_to_display);
    });
  });
 });
});
