 // destroy a __name-singular-pascal__
__name-plural-pascal__.destroy = function(data, callback) {
  console.log('Fired Destroy __name-singular-pascal__', data);
  Meteor.call('__name-plural-pascal__.destroy', data, callback);
};

