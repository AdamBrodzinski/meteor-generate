// Meteor Generate
// Copyright(c) 2014 Adam Brodzinski <adambrodzinski@gmail.com>
// MIT Licensed
//
// Generate a component folder containing an HTML template, JavaScript file
// and a Sass file. The Sass file import is also appended to /client/sass/comps

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
  fs.mkdirs(destPath, function (err) {
    if (err) {
      console.error('\nError creating directory');
      console.error(err);
    } else {
      copyTemplates();
      console.log('Created '+nameCase.snake+' directory in ' + destPath);
    }
  });

  var source = compTemplates + 'comp_name';
  var dest =   destPath + nameCase.snake;

  /** Copy Boilerplate from Cache
   *
   *  Boilerplate files are copied from ~/.mgen unless an
   *  alternative path was provided.
   */
  function copyTemplates() {
    // Create HTML template file
    fs.copy(source+'.html', dest+'.html', function (err) {
      handleError(err);
      replace(dest+'.html', function(data) {
        var res = data.replace(/compName/g, nameCase.camel);
        return res.replace(/comp-name/g, nameCase.hyphen);
      });
      console.log('  Created HTML Template');
    });

    // Create JavaScript file
    fs.copy(source+'.js', dest+'.js', function (err) {
      handleError(err);
      replace(dest+'.js', function(data) {
        return data.replace(/compName/g, nameCase.camel);
      });
      console.log('  Created JavaScript File');
    });

    // Create Sass file
    fs.copy(source+'.scss', destPath+'_'+nameCase.snake+'.scss', function (err) {
      handleError(err);
      replace(destPath+'_'+nameCase.snake+'.scss', function(data) {
        return data.replace(/comp-name/g, nameCase.hyphen);
      });
      console.log('  Created Sass File');
    });

  }

};

function handleError(err) {
  if (err) {
    console.log('\nError Creating File');
    console.log(err.stack);
    process.exit(1);
  }
}

function replace(file, callback) {
  fs.readFile(file, 'utf8', function (err,data) {
    if (err) { return console.log(err); }

    var result = callback(data);

    fs.writeFile(file, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}

