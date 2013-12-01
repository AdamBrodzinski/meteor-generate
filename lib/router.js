var fs = require('fs.extra');

/** Insert router.js into user's /both/controller/ folder
 *  If file already exists, do not overwrite.
 *  Copy router.js from templates to user's project.
 * @api public
 */
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
  fs.copy(routeSrc, routeDest, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('  Created both/routes.js');
  });     

};

