// Insert router into filesystem if it's not present

var fs = require('fs.extra');

exports.create = function() {
  var destRoot, routeSrc, routeDest;

  destRoot = 'both/';
  routeSrc = templatePath + 'router/routes.js';
  routeDest = destRoot + 'routes.js';

  fs.mkdirsSync(destRoot);

  // bail if router already exists
  if (fs.existsSync(destRoot + 'routes.js')) return;

  fs.copy(routeSrc, routeDest, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('  Created both/routes.js');
  });     

};

