/*global Posts, db */


// Show a list of Posts 
Posts.index = AppController.extend({
  template: 'posts',

  waitOn: function() {
    Meteor.subscribe('posts');
  },

  data: function() {
    return db.posts.find();
  }
});


// Show a single Post 
Posts.show = AppController.extend({
  template: 'showPost',

  waitOn: function() {
    Meteor.subscribe('post', this.params.id);
  },

  data: function() {
    return db.posts.findOne(this.params.id);
  }
});


// Edit a single Post 
Posts.edit = AppController.extend({
  template: 'editPost',

  waitOn: function() {
    Meteor.subscribe('post', this.params.id);
  },

  data: function() {
    return db.posts.findOne(this.params.id);
  }
});
 

// Show a new Post page
Posts.new = AppController.extend({
  template: 'newPost',

  waitOn: function() {
    Meteor.subscribe('posts');
  }
});
   

// ------------------ CRUD Controllers --------------------

Posts.create = function(data, callback) {
  check(data, {title:String, desc:String});

  var id = db.posts.insert({
    title: data.title,
    desc:  data.desc
  });

  if (typeof callback === 'function') {
    callback(id);
  };
  return id;
};

Posts.update = function(id, data, callback) {
  db.posts.update(id, data, callback);
};

Posts.destory = function(id, callback) {
  // TODO
};

