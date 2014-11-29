// Meteor Generate
// Copyright(c) 2014 Adam Brodzinski <adambrodzinski@gmail.com>
// MIT Licensed
//
// Creates a Meteor controller for Iron Router and custom CRUD methods.
// Saves controller actions to it's resource namespace. File is generated
// in `both/controllers` folder and the filename takes on the resource name.
// When file already exists, the new controllers are appended to the bottom.

/*global templatePath */
var fs = require('fs-extra');

module.exports = {
  controllerPath : 'both/controllers/',
  contrTemplates: templatePath + 'controller/',

  // Public: Creates a controller file & appends any type of controller needed.
  // If no options are passed in it will create all router and CRUD controllers
  //
  // resName - The {String} name of the resource passed in from command line
  // opts -    The options generated from a Commander command entry.
  //
  init: function(resName, opts) {

    // TODO ensure resName is always snake case
    this.contrFile = this.controllerPath + resName + '.js';
    this.resName = resName;
    this.opts = opts;

    // if no args passed in, created all routes
    if (!opts.index && !opts.new && !opts.show && !opts.edit &&
        !opts.create && !opts.update && !opts.destroy) {
      this.opts.all = true;
    }

    this._createBaseController();

    // add a comment line before adding new routes
    require('./router').appendRoute(resName, 'comment_line');

    // print 'created' if file doesn't exist yet (created on first append)
    if (!fs.existsSync(this.contrFile)) {
      console.log('    Created: ' + this.contrFile);
    }

    // Append Iron Router Controllers

    if (opts.index || opts.all) {
      this._appendController('index');
      require('./page').run(this.resName, {index: true});
    }

    if (opts.new || opts.all) {
      this._appendController('new');
      require('./page').run(resName, {'new': true});
    }

    if (opts.show || opts.all) {
      this._appendController('show');
      require('./page').run(resName, {show: true});
    }

    if (opts.edit || opts.all) {
      this._appendController('edit');
      require('./page').run(resName, {edit: true});
    }

    // Append data Controllers

    if (opts.create || opts.all) {
      this._appendController('create');
    }

    if (opts.update || opts.all) {
      this._appendController('update');
    }

    if (opts.destroy || opts.all) {
      this._appendController('destroy');
    }

    // add blank line to routes.js after controller routes
    require('./router').appendRoute(null, 'blank_line');

    // instantiate and add namespace for this resource if needed
    new (require('./namespace'))().add(resName);
  },


  // Private: Streams controller template from templates folder, renames any
  // template variables with `lib/rename.js`and appends the new processed
  // template into user's controller folder `both/controller/posts.js`. If this
  // file does not exist, it will be created. A route is appended to `routes.js`.
  //
  // action - The {String} name of the controller action, eg index, show
  //
  _appendController: function(action) {
    var templateStr = fs.readFileSync(this.contrTemplates + action + '.js',
                                 {encoding: 'utf-8'});

    // rename template variables and append to controller file
    templateStr = require('./rename')(this.resName, templateStr);
    fs.appendFileSync(this.contrFile, templateStr);

    // add a route for new controller
    if (action !== 'create' && action !== 'update' && action !== 'destroy') {
      require('./router').appendRoute(this.resName, action);
      console.log('    Added Route: ' + this.resName + " " + action);
    }
  },


  // Private: Copy base app controller from templates dir to user project
  // folder `both/controllers/app.js` Will not overwrite existing file.
  //
  _createBaseController: function() {
    if (fs.existsSync(this.controllerPath + '_app.js')) return;

    fs.copySync(this.contrTemplates+'_app.js', this.controllerPath+'_app.js');
    console.log('    Created: '+ this.controllerPath +'_app.js');
  }
};

