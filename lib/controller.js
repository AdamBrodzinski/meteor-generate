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

    if (!opts.index && !opts.new && !opts.show && !opts.edit &&
        !opts.create && !opts.update && !opts.destroy) {
      this.opts.all = true;
    }

    this.createBaseController();

    // add comment to top of resource routes
    require('./router').appendRoute(resName, 'comment_line');

    // resource file gets created before appending if none exists
    if (!fs.existsSync(this.contrFile)) {
      console.log('    Created: ' + this.contrFile);
    }

    // page controller for list of resources
    if (opts.index || opts.all) {
      this.appendController('index');
      require('./page').run(this.resName, {index: true});
    }

    // page controller for creating a new resource
    if (opts.new || opts.all) {
      this.appendController('new');
      require('./page').run(resName, {new: true});
    }

    // page controller for a single resource
    if (opts.show || opts.all) {
      this.appendController('show');
      require('./page').run(resName, {show: true});
    }

    // page for controller editing a resource
    if (opts.edit || opts.all) {
      this.appendController('edit');
      require('./page').run(resName, {edit: true});
    }

    // data controller for new resource
    if (opts.create || opts.all) {
      this.appendController('create');
    }

    // data controller for updating a resource
    if (opts.update || opts.all) {
      this.appendController('update');
    }

    // data controller for removing a resource
    if (opts.destroy || opts.all) {
      this.appendController('destroy');
    }

    // add blank line to routes.js
    require('./router').appendRoute(null, 'blank_line');

    // add resource namespace
    // TODO make this pacal case
    require('./namespace').add(resName);
  },


  // Private: Streams controller template into the end of resource controller
  // file. An action param is used to select which template to stream. If the
  // file doesn't exisit, it will be created. A route is appended to routes.js
  //
  // action - The {String} name of the controller action, eg index, show
  //
  appendController: function(action) {
    var string = fs.readFileSync(this.contrTemplates + action + '.js');
    fs.appendFileSync(this.contrFile, string);
    // add a route for new controller
    if (action !== 'create' && action !== 'update' && action !== 'destroy') {
      require('./router').appendRoute(this.resName, action);
      console.log('    Added Route: ' + this.resName + " " + action);
    }
  },
  

  // Private: Copy base app controller from templates dir to user project
  // folder `both/controllers/app.js` Will not overwrite existing file.
  //
  createBaseController: function() {
    if (fs.existsSync(this.controllerPath + 'app.js')) return;

    fs.copySync(this.contrTemplates+'app.js', this.controllerPath+'app.js');
    console.log('    Created: '+ this.controllerPath +'app.js');
  }
};

