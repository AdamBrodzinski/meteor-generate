// page for a list of Posts - /posts
PostsController.Index = AppController.extend({
  template: 'posts',

  waitOn: function() {
    return Meteor.subscribe('posts');
  },

  data: function() {
    return db.posts.find();
  },

  onBeforeAction: function() {
    console.log("  [PostsController.Index]: loading", this.url);
    this.next();
  }
});


// page for creating a single Post - /posts/new/:id
PostsController.New = AppController.extend({
  template: 'postsNew',

  onBeforeAction: function() {
    console.log("  [PostsController.New]: loading", this.url);
    this.next();
  }
});


// page for showing a single Post - /posts/:id
PostsController.Show = AppController.extend({
  template: 'postsShow',

  waitOn: function() {
    //return Meteor.subscribe('post', this.params.id);
  },

  data: function() {
    //return db.posts.findOne(this.params.id);
  },

  onBeforeAction: function() {
    console.log("  [PostsController.Show]: loading", this.url);
    this.next();
  }
});


// show edit page for single Post : /posts/edit/:id
PostsController.Edit = AppController.extend({
  template: 'postsEdit',

  waitOn: function() {
    //return Meteor.subscribe('post', this.params.id);
  },

  data: function() {
    //return db.posts.findOne(this.params.id);
  },

  onBeforeAction: function() {
    console.log("  [PostsController.Edit]: loading", this.url);
    this.next();
  }
});


// create a Post
PostsController.create = function(data, callback) {
  console.log('Fired Create Post');

  Post.create(data, function(err, docId) {
    if (callback) {
      callback(err, docId);
    }

    if (err) {
      console.log(err);
    }
  });
};


// update a Post
PostsController.update = function(data, callback) {
  console.log('Fired Update Post');

  Post.update(data, function(err, count) {
    if (callback){
      callback(err, count);
    }

    if (err) {
      console.log(err);
    }
  });
};


// destroy a Post
PostsController.destroy = function(data, callback) {
  console.log('Fired Destroy Post');

  Post.destroy(data, function(err, count) {
    if (callback) {
      callback(err, count);
    }

    if (err) {
      console.log(err);
    }
  });
};
