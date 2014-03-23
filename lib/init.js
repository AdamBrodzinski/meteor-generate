/*global templatePath */
var fs = require('fs-extra'),
    router = require('./router.js');

module.exports = {
  initSource: templatePath + 'init/',
  initDest: './',

  // Public: Copy the boilerplate in the templates init folder to
  // the user's root project folder. Creates a router and client
  // folder. The project name is used for removing original boilerplate. 
  // 
  // Examples:
  // require('./init').init('myProjectName');
  //
  // projectName - the {String} name of the user's meteor project
  //
  init: function(projectName, opts) {
    this.opts = opts;
    this.projectName = projectName;

    router.create();
    this._copyTemplate();
    this._removeOriginalMeteorFiles(projectName);

    console.log('\nPlease run mrt to install Iron Router\n');
  },
  

  // Private: Copy the boilerplate from templates directory and place it
  // in the user's project root directory.
  //
  _copyTemplate: function() {
    fs.copySync(this.initSource, this.initDest);

    fs.removeSync('./both/.gitkeep');
    fs.removeSync('./server/.gitkeep');

    console.log('    Created: .jshintrc');
    console.log('    Created: .jshintignore');
    console.log('    Created: smart.json');
    console.log('    Created: makefile');
  },


  // Private: Removes the original foo.html, foo.js, and foo.css files
  // that Meteor creates after a `meteor create foo` command
  //
  // projectName - The {String} name of the project (same as meteor create)
  //
  _removeOriginalMeteorFiles: function(projectName) {
    fs.removeSync('./'+ this.projectName +'.js');
    fs.removeSync('./'+ this.projectName +'.html');
    fs.removeSync('./'+ this.projectName +'.css');

    console.log('    Removed: original boilerplate');
  }
};

