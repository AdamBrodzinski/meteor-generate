Meteor.publish('post', function(id) {
  check(id, String);
  // TODO index query
  return db.posts.find({_id: id});
});


Meteor.publish('posts', function() {
  // TODO index query
  // XXX bad performance no limit
  return db.posts.find({});
});
