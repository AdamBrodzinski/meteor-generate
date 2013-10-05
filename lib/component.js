// generate a component folder with its files

//var mkdir = require('mkdirp');
var fs = require('fs.extra');

exports.run = function(compName) {
  var templateDir = '/Users/adam/.mgen/component/comp_name.html';
  var destPath = './client/components/' + compName + '/';

  // create a directory in components folder
  fs.mkdir(destPath, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('Created '+compName+' directory in ./client/components/');
    }
  });


  fs.copy(templateDir, destPath+compName+'.html', function (err) {
    if (err) throw err;
  });

  fs.copy(templateDir, destPath+compName+'.js', function (err) {
    if (err) throw err;
  });

  fs.copy(templateDir, destPath+ '_' + compName+'.scss', function (err) {
    if (err) throw err;
  });
};

