/*global doesNotOwnDocument:true, ownsDocument:true */
 
doesNotOwnDocument = function(userId, doc) {
  return !ownsDocument(userId, doc);
};

ownsDocument = function(userId, doc) {
  return userId && doc.owner === userId;
};
   
