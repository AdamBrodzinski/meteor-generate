var fs = require('fs-extra');

module.exports = {
  destRoot: 'both/',
  routeSrc: templatePath + 'router/routes.js',
  routeDest: 'both/routes.js',

  // Public: Copy routes.js from templates folder into users `both/` folder.
  //         If file already exists it will not be overwritten.
  //
  create: function() {
    // create both folder if it doesn't already exisit
    fs.mkdirsSync(this.destRoot);

    // bail if router already exists
    if (fs.existsSync(this.destRoot + 'routes.js')) return;

    // copy router.js from templates/ to project/both/controllers
    fs.copySync(this.routeSrc, this.routeDest);
    console.log('  Created both/routes.js');
  },

  appendRoute: function() {
    //var string = fs.readFileSync(this.contrTemplates + action + '.js');
    //fs.appendFileSync(this.contrFile, string);
    
  },

  appendAllRoutes: function() {
    
  }
};
  
  

