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
  // opts -    The options generated from a Commander command entry.
  //
  // Create all controllers passed in
  init: function(resName, opts) {

    // TODO ensure resName is always snake case
    this.contrFile = this.controllerPath + resName + '.js';
    this.opts = opts;

    this.createBaseController();

    // resource file gets generated before appending if none exists

    // page controller for list of resources
    if (opts.index) {
      this.appendController('index');
    }

    // page controller for creating a new resource
    if (opts.new) {
      this.appendController('new');
    }

    // page controller for a single resource
    if (opts.show) {
      this.appendController('show');
    }

    // page for controller editing a resource
    if (opts.edit) {
      this.appendController('edit');
    }

    // data controller for new resource
    if (opts.create) {
      this.appendController('create');
    }

    // data controller for updating a resource
    if (opts.update) {
      this.appendController('update');
    }

    // data controller for removing a resource
    if (opts.destroy) {
      this.appendController('destroy');
    }

    // create resource controller file

    // append routes to routes.js
  },


  // Private: Streams controller template into the end of resource controller
  //          file. An action param is used to select which template to stream.
  //          If the file doesn't exisit, it will be created.
  //
  // action - The {String} name of the controller action, eg index, show
  //
  appendController: function(action) {
    var string = fs.readFileSync(this.contrTemplates + action + '.js');
    fs.appendFileSync(this.contrFile, string);
  },
  

  // Private: Copy base app controller from templates dir to user project
  //          folder `both/controllers/app.js` Will not overwrite existing file.
  //
  createBaseController: function() {
    if (fs.existsSync(this.controllerPath + 'app.js')) return;

    fs.copySync(this.contrTemplates+'app.js', this.controllerPath+'app.js');
    console.log('  Created '+ this.controllerPath +'app.js');
  }
};

