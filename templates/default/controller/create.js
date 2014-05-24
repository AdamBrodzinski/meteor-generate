// create a __name-singular-pascal__
__name-plural-pascal__Controller.create = function(data, callback) {
  console.log('Fired Create __name-singular-pascal__');

  __name-singular-pascal__.create(data, function(err, docId) {
    if (callback) {
      callback(err, docId);
    }

    if (err) {
      console.log(err);
    }
  });
};

 
