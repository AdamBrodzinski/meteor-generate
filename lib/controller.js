/*global templatePath */
var fs = require('fs-extra');

// Public: Creates a controller file and any type of controller needed.
//         By default if no options are passed in it will create all router and
//         CRUD controllers. Routes are appended to `/both/routes.js`
//
// resName - The {String} name of the resource passed in from command line `controller posts`
// options - The options generated from a Commander command entry.
//
exports.create = function(resName, options) {

  var contrPath = 'both/controllers/';
  var contrTemplates = templatePath + 'controller/';
  // TODO ensure resName is always snake case
  var contrFile =  contrPath + resName + '.js';

  fs.mkdirsSync(contrPath);

  // copy app base controller to project if it doesn't exist
  if (!fs.existsSync(contrPath + 'app.js')) {
    fs.copySync(contrTemplates+'app.js', contrPath+'app.js');
    console.log('  Created '+contrPath+'app.js');
  }

  // append all controllers to file
  appendController('index');

  // if opts, only append those controllers

  // create resource controller file

  // append routes to routes.js

  function appendController(action) {
    fs.appendFileSync(contrFile, action);
  }
};

