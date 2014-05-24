// update a __name-singular-pascal__
__name-plural-pascal__Controller.update = function(data, callback) {
  console.log('Fired Update __name-singular-pascal__');

  __name-singular-pascal__.update(data, function(err, count) {
    if (callback){
      callback(err, count);
    }

    if (err) {
      console.log(err);
    }
  });
};


