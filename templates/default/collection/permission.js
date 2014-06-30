// RES Permissions
// see docs for more info - http://docs.meteor.com/#allow

db.__name-camel__.allow({
  insert: function() {
    console.log("*** db.listings insert not secure ***");
    return true;
  },

  update: function() {
    console.log("*** db.listings update not secure ***");
    return true;
  },

  remove: function() {
    console.log("*** db.listings remove not secure ***");
    return true;
  },

  //fetch: ['owner'],

  // perform a type check to ensure correct data is getting saved
  transform: function(doc) {
    check(doc, Match.Optional({
      _id: String
    }));

    return doc;
  }
});


db.__name-camel__.deny({
  update: doesNotOwnDocument,
  remove: doesNotOwnDocument,
  //fetch: ['owner']
});

