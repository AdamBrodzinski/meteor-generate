/*global templatePath */
var fs = require('fs-extra');

module.exports = {
  controllerPath : 'both/controllers/',
  contrTemplates: templatePath + 'controller/',

  // Public: Creates a controller file and any type of controller needed.
  //         By default if no options are passed in it will create all router and
  //         CRUD controllers. Routes are appended to `/both/routes.js`
  //
  // resName - The {String} name of the resource passed in from command line
  // options - The options generated from a Commander command entry.
  //
  // Create all controllers passed in
  init: function(resName, opts) {

    // TODO ensure resName is always snake case
    this.contrFile = this.controllerPath + resName + '.js';

    this.createBaseController();

    // append all controllers to file
    this.appendController('index');

    // if opts, only append those controllers

    // create resource controller file

    // append routes to routes.js
  },

  appendController: function(action) {
    fs.appendFileSync(this.contrFile, action);
  },
  
  // Private: copy app base controller to project if it doesn't exist
  createBaseController: function() {
    if (fs.existsSync(this.controllerPath + 'app.js')) return;

    fs.copySync(this.contrTemplates+'app.js', this.controllerPath+'app.js');
    console.log('  Created '+ this.controllerPath +'app.js');
  }
};

