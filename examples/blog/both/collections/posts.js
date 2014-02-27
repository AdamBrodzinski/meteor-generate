/*global db:true */


// Posts Collection
db.posts = new Meteor.Collection('posts');


// FIXME TODO Lock these down before production
db.posts.allow({
  insert: function(userId, doc) {
    return true;
  },

  update: function(userId, doc, fieldNames, modifier) {
    return true;
  },

  remove: function(userId, doc) {
    return true;
  }
});


// FIXME TODO Lock these down before production
db.posts.deny({
  insert: function(userId, doc) {
    return false;
  },

  update: function(userId, doc, fieldNames, modifier) {
    return false;
  },

  remove: function(userId, doc) {
    return false;
  }
});

