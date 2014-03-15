 // update a __name-singular-pascal__
__name-plural-pascal__.update = function(data, callback) {
  console.log('Fired Update __name-singular-pascal__', data);
  Meteor.call('__name-plural-pascal__.update', data, callback);
};


