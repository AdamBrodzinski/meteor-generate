// generate a component folder with its files

//var mkdir = require('mkdirp');
var fs = require('fs.extra');

exports.run = function(compName) {
  var templateDir = '/Users/adam/.mgen/component/';
  var destPath = './client/components/' + compName + '/';

  // create a directory in components folder
  fs.mkdir(destPath, function (err) {
    if (err) {
      console.error('\nError creating directory');
      console.error(err);
    } else {
      console.log('Created '+compName+' directory in ./client/components/');
    }
  });


  fs.copy(templateDir + 'comp_name.html', destPath+compName+'.html', function (err) {
    handleError(err);
    console.log('  Created HTML Template');
  });

  fs.copy(templateDir + 'comp_name.js', destPath+compName+'.js', function (err) {
    console.log('  Created JavaScript File');
    handleError(err);
  });

  fs.copy(templateDir + 'comp_name.scss', destPath+ '_' + compName+'.scss', function (err) {
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

