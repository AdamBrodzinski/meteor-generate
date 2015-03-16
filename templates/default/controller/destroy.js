// destroy a __name-singular-pascal__
__name-plural-pascal__Controller.destroy = function(data, callback) {
  log.debug('[__name-plural-pascal__Controller.destroy]', data);

  __name-singular-pascal__.destroy(data, function(err, count) {
    if (callback) callback(err, count);
    if (err) return trackError(err, {showAlert: true});

  });
};

