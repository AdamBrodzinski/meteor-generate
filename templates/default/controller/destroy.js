// destroy a __name-singular-pascal__
__name-plural-pascal__Controller.destroy = function(data, callback) {
  console.log('Fired Destroy __name-singular-pascal__');

  __name-singular-pascal__.destroy(data, function(err, count) {
    if (callback) {
      callback(err, count);
    }

    if (err) {
      console.log(err);
    }
  });
};

