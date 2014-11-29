// Meteor Generate
// Copyright(c) 2014 Adam Brodzinski <adambrodzinski@gmail.com>
// MIT Licensed

/*global templatePath, puts */
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
    this.packages = this.projDir + '.meteor/packages';

    this._runTerminalCommand('meteor create '+ projectName, function() {
      // after command is finished
      router.create(self.projDir);
      self._copyTemplate();
      self._removeOriginalMeteorFiles(projectName);
      self._removeUnwantedPackages();
      self._addPackagesToPackagesFile();

      puts('\n-------------------------------------------');
      puts('  type cd %s to navigate to project', projectName);
      puts('  then the meteor command to start a server');
      puts('-------------------------------------------\n');
    });
  },


  // Private: Run a command on the command line.
  //
  // command - the {String} command to run
  // callback - a {Function} to call when complete
  //
  _runTerminalCommand: function(command, callback) {
    var exec = require('child_process').exec;

    exec(command, function (err) {
      if (err) puts('exec error: ' + err);
      callback.call(this);
    });
  },


  // Private: Add packages into Meteor's `.meteor/packages` file so that they
  // can get installed on first bootup. Appends the packages to the end of file
  //
  _addPackagesToPackagesFile: function() {
    fs.appendFileSync(this.projDir + '.meteor/packages', 'iron:router\n');
    fs.appendFileSync(this.projDir + '.meteor/packages', 'browser-policy\n');
    puts("    Added Package: iron:router");
    puts("    Added Package: browser-policy");
  },


  // Private: Copy the boilerplate from templates directory and place it
  // in the user's project root directory. Remove .gitkeep when done
  //
  _copyTemplate: function() {
    fs.copySync(this.initSource, this.projDir);
    fs.removeSync(this.projDir + 'client/.gitkeep');
    fs.removeSync(this.projDir + 'server/.gitkeep');

    puts('    Created: .jshintrc');
    puts('    Created: .jshintignore');
    puts('    Created: makefile');
  },


  // Private: Removes the original foo.html, foo.js, and foo.css files
  // that Meteor creates after a `meteor create foo` command
  //
  _removeOriginalMeteorFiles: function() {
    fs.removeSync(this.projDir + this.projectName + '.js');
    fs.removeSync(this.projDir + this.projectName + '.html');
    fs.removeSync(this.projDir + this.projectName + '.css');
    puts('    Removed: original boilerplate');
  },


  // Private: Removes packages that are not wanted for a production app
  //
  _removeUnwantedPackages: function() {
    this._removePackage('insecure');
    this._removePackage('autopublish');
    puts("Updating Packages");
    puts("    Removed Package: insecure");
    puts("    Removed Package: autopublish");
  },


  // Private: Look at packages file and remove package if present. Stream
  // packages file, replace, then overwrite original file.
  //
  // packageName - The {String} name of the package
  //
  _removePackage: function(packageName) {
    var oldPackages, newPackages;

    oldPackages = fs.readFileSync(this.packages, {encoding: 'utf-8'});
    newPackages = oldPackages.replace(packageName + '\n', '');
    fs.writeFileSync(this.packages, newPackages);
  }

};

