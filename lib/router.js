var fs = require('fs-extra');

// Private: Copy routes.js from templates folder into user's `/both` folder
//          If file already exists, do not overwrite.
exports.create = function() {
  var destRoot, routeSrc, routeDest;

  destRoot = 'both/';
  routeSrc = templatePath + 'router/routes.js';
  routeDest = destRoot + 'routes.js';

  // create both folder if it doesn't already exisit
  fs.mkdirsSync(destRoot);

  // bail if router already exists
  if (fs.existsSync(destRoot + 'routes.js')) return;

  // copy router.js from templates/ to project/both/controllers
  fs.copySync(routeSrc, routeDest);
  console.log('  Created both/routes.js');
};

