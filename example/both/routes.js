//  Iron Router - for useage see https://github.com/EventedMind/iron-router

Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.map(function () {
  this.route('root', { path: '/', controller: PostsController.Index });

  // posts routes
  this.route('posts',     { path: '/posts',          controller: PostsController.Index });
  this.route('postsNew',  { path: '/posts/new',      controller: PostsController.New });
  this.route('postsShow', { path: '/posts/:id',      controller: PostsController.Show });
  this.route('postsEdit', { path: '/posts/edit/:id', controller: PostsController.Edit });

});//<end-routes>
