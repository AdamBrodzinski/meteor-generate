// generate a page folder containing an HTML template, JavaScript file
// and a Sass file. The Sass file include is also appended to /client/sass/comps

/*global templateDir */
var fs = require('fs.extra');
var changeCase = require('change-case');

exports.run = function(pageName, opts) {
  var nameCase, pageTemplates, destPath;

  nameCase = {
    snake:  pageName,
    camel:  changeCase.camelCase(pageName),
    hyphen: changeCase.paramCase(pageName)
  };

  pageTemplates = templateDir + 'pages/';

  destPath = opts.directory + pageName + '/';

  // create a directory in components folder
  fs.mkdirs(destPath, function (err) {
    if (err) {
      console.error('\nError creating directory', pageName);
      console.error(err);
    } else {
      console.log('\nCreate    '+ destPath);
    }
  });


};

