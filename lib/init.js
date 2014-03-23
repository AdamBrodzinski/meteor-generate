/*global templatePath */
var fs = require('fs-extra'),
    router = require('./router.js');

module.exports = {
  initSource: templatePath + 'init/',

  // Public: Copy the boilerplate in the templates init folder to
  // the user's root project folder. Creates a router and client
  // folder. The project name is used for removing original boilerplate. 
  // 
  // Examples:
  // require('./init').init('myProjectName');
  //
  // projectName - the {String} name of the user's meteor project
  //
  init: function(projectName) {
    var self = this;
    this.projectName = projectName;
    this.projDir = './' + projectName + '/';

    this._runCommand('meteor create ' + projectName, function() {

      router.create(self.projDir);
      self._copyTemplate();
      self._removeOriginalMeteorFiles(projectName);
      // append package into meteor/packages to allow an mrt install
      fs.appendFileSync(self.projDir + '.meteor/packages', 'iron-router');

      console.log('\n-------------------------------------------');
      console.log('  type cd %s to navigate to project', projectName);
      console.log('  then run `mrt update` to install Iron Router');
      console.log('-------------------------------------------\n');
    });
  },
  

  // Private: Copy the boilerplate from templates directory and place it
  // in the user's project root directory. Remove .gitkeep when done
  //
  _copyTemplate: function() {
    fs.copySync(this.initSource, this.projDir);
    fs.removeSync(this.projDir + 'client/.gitkeep');
    fs.removeSync(this.projDir + 'server/.gitkeep');

    console.log('    Created: .jshintrc');
    console.log('    Created: .jshintignore');
    console.log('    Created: smart.json');
    console.log('    Created: makefile');
  },


  // Private: Removes the original foo.html, foo.js, and foo.css files
  // that Meteor creates after a `meteor create foo` command
  //
  _removeOriginalMeteorFiles: function() {
    // example: remove   "./mybook/mybook.js"
    fs.removeSync(this.projDir + this.projectName + '.js');
    fs.removeSync(this.projDir + this.projectName + '.html');
    fs.removeSync(this.projDir + this.projectName + '.css');

    console.log('    Removed: original boilerplate');
  },


  // Private: Run a command on the command line.
  //
  // command - the {String} command to run
  // callback - a {Function} to call when complete
  //
  _runCommand: function(command, callback) {
    var exec = require('child_process').exec;

    exec(command, function (err) {
      if (err) console.log('exec error: ' + err);
      callback.call(this);
    });
  }

};

