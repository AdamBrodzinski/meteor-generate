var fs = require('fs-extra');

module.exports = {

  // Public: Copy routes.js from templates folder into users `both/` folder.
  //         If file already exists it will not be overwritten.
  //
  create: function() {
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
  },

  appendRoute: function() {
    
  },

  appendAllRoutes: function() {
    
  }
};
  
  

