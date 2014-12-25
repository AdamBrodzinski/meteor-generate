Meteor.publish('__pub-name__', function() {
  // TODO index query
  // XXX bad performance no limit
  return db.__name-plural-camel__.find({});
});


