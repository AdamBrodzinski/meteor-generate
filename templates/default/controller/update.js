// update a __name-singular-pascal__
__name-plural-pascal__Controller.update = function(data, callback) {
  log.debug('[__name-plural-pascal__Controller.update]', data);

  __name-singular-pascal__.update(data, function(err, count) {
    if (callback) callback(err, count);
    if (err) return trackError(err, {showAlert: true});

  });
};


