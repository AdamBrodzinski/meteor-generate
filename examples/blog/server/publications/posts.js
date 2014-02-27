/*global db */

Meteor.publish('posts', function() {
  return db.posts.find({});
});

Meteor.publish('post', function(id) {
  check(id, String);
  return db.posts.find(id);
});

