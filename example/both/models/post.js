// CRUD facade to call Meteor methods more elegantly
Post = {
  create: function(data, callback) {
    return Meteor.call('Post.create', data, callback);
  },

  update: function(docId, data, callback) {
    return Meteor.call('Post.update', docId, data, callback);
  },

  destroy: function(docId, callback) {
    return Meteor.call('Post.destroy', docId, callback);
  }
};


// ** NOTE**
// all insert, update, and delete MiniMongo methods are disabled on the client.
// this ensures more granular security & moves the security logic into the
// meteor method. all mutation has to happen with the Meteor methods. these
// methods are placed into the 'both' folder so that Meteor uses the methods as
// stubs on the client, retaining the latency compensation. if you need to
// obscure the model, move the method into the server directory. doing so will lose
// latency compensation, a stub can be created on the client folder to re-enable
//
// console.logs are added to help prevent forgetting to secure before shipping


Meteor.methods({
  // returns {String} of document id
  "Post.create": function(data) {
    console.warn("No AUTH CHECK: Post.create"); // XXX insecure method
    //if (!this.userId) throw new Meteor.Error(401, "You must be logged in");
    data.ownerId = this.userId;

    console.warn("INSECURE Model Schema: Post.create"); // XXX insecure method
    //check(data, { key1: String, key2: Number });

    var docId =  db.posts.insert(data);
    console.log("  [Post.create]", docId);
    return docId;
  },


  // Returns {Number} of documents updated
  "Post.update": function(docId, data) {
    console.warn("No AUTH CHECK: Post.update"); // XXX insecure method
    //if (!this.userId) throw new Meteor.Error(401, "You must be logged in");

    console.warn("INSECURE Model Schema: Post.update"); // XXX insecure method
    //check(data, { key1: String, key2: Number });

    // if caller doesn't own document this will fail because the query field will not match
    var count = db.posts.update({_id: docId, ownerId: this.userId}, {$set: data});
    console.log("  [Post.update]", count);
    return count;
  },


  // Returns {Number} of documents deleted
  "Post.destroy": function(docId) {
    console.warn("No AUTH CHECK: Post.destroy"); // XXX insecure method
    //if (!this.userId) throw new Meteor.Error(401, "You must be logged in");

    // if caller doesn't own document this will fail because the query field will not match
    var count = db.posts.remove({_id: docId, ownerId: this.userId});
    console.log("  [Post.destroy]", count);
    return count;
  }
});

