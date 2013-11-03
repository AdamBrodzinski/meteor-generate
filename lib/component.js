// generate a component folder with its files

//var mkdir = require('mkdirp');
var fs = require('fs.extra');

exports.run = function(compName) {
  var templateDir = '/Users/adam/.mgen/component/';
  var destPath = './client/components/' + compName + '/';

  // create a directory in components folder
  fs.mkdir(destPath, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('Created '+compName+' directory in ./client/components/');
    }
  });


  fs.copy(templateDir + 'comp_name.html', destPath+compName+'.html', function (err) {
    if (err) throw err;
    console.log('  Created HTML Template');
  });

  fs.copy(templateDir + 'comp_name.js', destPath+compName+'.js', function (err) {
    if (err) throw err;
    console.log('  Created JavaScript File');
  });

  fs.copy(templateDir + 'comp_name.scss', destPath+ '_' + compName+'.scss', function (err) {
    if (err) throw err;
    console.log('  Created Sass File');
  });
};

