/*global __name-singular-pascal__:true, User */

// CRUD facade to call Meteor methods more elegantly
__name-singular-pascal__ = {
  create: function(data, callback) {
    return Meteor.call('__name-singular-pascal__.create', data, callback);
  },

  update: function(docId, data, callback) {
    return Meteor.call('__name-singular-pascal__.update', docId, data, callback);
  },

  destroy: function(docId, callback) {
    return Meteor.call('__name-singular-pascal__.destroy', docId, callback);
  }
};


// ** Security README **
//
// all insert, update, and delete MiniMongo methods are disabled on the client
// by not having allow/deny rules. This ensures more granular security & moves
// the security logic into the meteor method. all mutation has to happen with
// the Meteor methods. These methods are placed into the 'both' folder so that
// Meteor uses the methods as stubs on the client, retaining the latency
// compensation. if you need to hide the model, move the method into the
// server directory. doing so will lose latency compensation, however a stub
// can be created on the client folder to re-enable latency compensation.
//
// Methods assume you have accounts and require the caller to be logged in for
// security. If this is not needed, remove the loggedIn check AND the ownerId
// assignment so the ownerId is not null on create.
//
// Temporary `foo` and `bar` fields are created to allow automated tests to be
// created and still pass. Soon you can pass in attr name:type at creation


Meteor.methods({
  /**
   * Creates a __name-singular-pascal__ document
   * @method
   * @param {object} data - data to insert
   * @returns {string} of document id
   */
  "__name-singular-pascal__.create": function(data) {
    var docId;
    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");

    data.ownerId = User.id();
    data.createdAt = new Date();

    // TODO plug in your own schema
    check(data, {
      createdAt: Date,
      ownerId: String,
      // XXX temp fields
      foo: String,
      bar: String
    });

    docId = db.__name-plural-camel__.insert(data);

    console.log("  [__name-singular-pascal__.create]", docId);
    return docId;
  },


  /**
   * Updates a __name-singular-pascal__ document using $set
   * @method
   * @param {string} docId - The doc id to update
   * @param {object} data - data to update
   * @returns {number} of documents updated (0|1)
   */
  "__name-singular-pascal__.update": function(docId, data) {
    var optional = Match.Optional;
    var count, selector;

    check(docId, String);
    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");
    data.updatedAt = new Date();

    // TODO plug in your own schema
    check(data, {
      createdAt: Date,
      updatedAt: Date,
      ownerId: String,
      // XXX temp fields
      foo: optional(String),
      bar: String
    });

    // if caller doesn't own doc, update will fail because fields won't match
    selector = {_id: docId, ownerId: User.id()};

    count = db.__name-plural-camel__.update(selector, {$set: data});

    console.log("  [__name-singular-pascal__.update]", count, docId);
    return count;
  },


  /**
   * Destroys a __name-singular-pascal__
   * @method
   * @param {string} docId - The doc id to destroy
   * @returns {number} of documents destroyed (0|1)
   */
  "__name-singular-pascal__.destroy": function(docId) {
    var count;
    check(docId, String);

    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");

    // if caller doesn't own doc, destroy will fail because fields won't match
    count = db.__name-plural-camel__.remove({_id: docId, ownerId: User.id()});

    console.log("  [__name-singular-pascal__.destroy]", count);
    return count;
  }
});

