/*global templatePath */
var fs = require('fs-extra');
 
module.exports = {
  dest: './packages/',
  template: templatePath + '/package',

  create: function(packageName) {
    this._copyTemplate(packageName);
    //this._renamePackage();
    // Append package to Meteor packages
    fs.appendFileSync('./.meteor/packages', projectName);
  },

  _copyTemplate: function(packageName) {
    fs.copySync(this.template, this.dest + packageName);
  },
  
  _renamePackage: function() {
    
  }
};

