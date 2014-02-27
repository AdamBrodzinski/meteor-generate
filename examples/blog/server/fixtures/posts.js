// Quick demo fixture
if (!db.posts.findOne()) {

  Posts.create({title: 'My First Post', desc: 'How now brown cow.'}, function(id) {
    console.log('my post id is:', id);
  });

  Posts.create({title: 'Edit Me', desc: 'The quick brown fox jumped over the fence.'}, function(id) {
    console.log('my post id is:', id);
  });

};
