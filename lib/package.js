/*global templatePath */
var fs = require('fs-extra');
 
module.exports = {
  dest: './packages/',
  template: templatePath + '/package',

  create: function(packageName) {
    this._copyTemplate(packageName);
    //this._renamePackage();
  },

  _copyTemplate: function(packageName) {
    fs.copySync(this.template, this.dest + packageName);
  },
  
  _renamePackage: function() {
    
  }
};

