// create a __name-singular-pascal__
__name-plural-pascal__.create = function(data, callback) {
  console.log('Fired Create __name-singular-pascal__', data);
  Meteor.call('__name-plural-pascal__.create', data, callback);
};

 
