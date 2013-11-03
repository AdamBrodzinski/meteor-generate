// generate a component folder containing a HTML template, JavaScript file
// and a Sass file. The Sass file is also appended to /client/sass/comps

/*global templateDir */
var fs = require('fs.extra');
var changeCase = require('change-case');

exports.run = function(compName, opts) {
  var nameCase, compTemplates, destPath;

  nameCase = {
    snake:  compName,
    camel:  changeCase.camelCase(compName),
    hyphen: changeCase.paramCase(compName)
  };

  compTemplates = templateDir + 'component/';
  destPath = opts.directory + compName + '/';

  // create a directory in components folder
  fs.mkdir(destPath, function (err) {
    if (err) {
      console.error('\nError creating directory');
      console.error(err);
    } else {
      console.log('Created '+compName+' directory in ' + destPath);
    }
  });

  var source = compTemplates + 'comp_name';
  var dest =   destPath + nameCase.snake;

  // Create HTML template file
  fs.copy(source+'.html', dest+'.html', function (err) {
    handleError(err);
    console.log('  Created HTML Template');
  });

  // Create JavaScript file
  fs.copy(source+'.js', dest+'.js', function (err) {
    console.log('  Created JavaScript File');
    handleError(err);
  });

  // Create Sass file
  fs.copy(source+'.scss', destPath+'_'+nameCase.snake+'.scss', function (err) {
    console.log('  Created Sass File');
    handleError(err);
  });
};

function handleError(err) {
  if (err) {
    console.log('\nError Creating File');
    throw err;
  }
}

