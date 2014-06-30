// __name-pascal__ Permissions
// see docs for more info - http://docs.meteor.com/#allow

db.__name-camel__.allow({
  insert: function() {
    console.log("\n*** db.__name-camel__ insert not secure ***\n");
    return true;
  },

  update: function() {
    console.log("\n*** db.__name-camel__ update not secure ***\n");
    return true;
  },

  remove: function() {
    console.log("\n*** db.__name-camel__ remove not secure ***\n");
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

