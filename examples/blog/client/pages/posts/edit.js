/*global Posts */

Template.editPost.helpers({
  
});

Template.editPost.events({
  'submit form': function(e) {
    var form, id, data;
    e.preventDefault();

    form = new ParseForm('#edit-post-form');
    id = form.$el.attr('data-id');

    data = {
      title: form.title,
      desc: form.desc
    };

    Posts.update(id, {$set: data}, function() {
      Router.go('/posts/' + id);
    });
  },
  
  
});

Template.editPost.rendered = function() {
  
};
