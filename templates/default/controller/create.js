// create a __name-singular-pascal__
__name-plural-pascal__Controller.create = function(data, callback) {
  log.debug('[__name-plural-pascal__Controller.create]', data);

  __name-singular-pascal__.create(data, function(err, docId) {
    if (callback) callback(err, docId);
    if (err) return trackError(err, {showAlert: true});

  });
};


