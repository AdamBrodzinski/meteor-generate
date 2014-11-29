// Meteor Generate
// Copyright(c) 2014 Adam Brodzinski <adambrodzinski@gmail.com>
// MIT Licensed
//
// Generate a page folder containing an HTML template, JavaScript file
// and a Sass file. The Sass file include is also appended to /client/sass/comps


// XXX dirty dirty dirty (>_<)
// TODO refactor into clean module

/*global templatePath */
var fs = require('fs-extra');
var changeCase = require('change-case');
var pageTemplates = templatePath + 'page/';

exports.run = function(pageName, opts) {
  var nameCase, destPath;

  nameCase = {
    snake:  pageName,
    camel:  changeCase.camelCase(pageName),
    hyphen: changeCase.paramCase(pageName)
  };


  // set destination, e.g. client/pages/posts/
  opts.directory = opts.directory || 'client/pages/';
  destPath = opts.directory + pageName + '/';


  // create a directory in components folder
  fs.mkdirs(destPath, function (err) {
    var importStr;

    if (err) {
      console.error('\nError creating directory', pageName);
      console.error(err);
    } else {
      copyTemplates();
    }
  });


  var templatePath = pageTemplates;
  var pagePath     = destPath;


  function copyTemplates() {
    // if no action flags are passed, scaffold everything
    if (!opts.index && !opts.new && !opts.show && !opts.edit) {
      opts.index = true;
      opts.new = true;
      opts.show = true;
      opts.edit = true;
    }

    if (opts.index) {
      copyFile({ from: templatePath, to: pagePath, pageName: pageName,
        filename: 'index', ext: ['.html', '.js', '.scss'],
        replaceWith: pageName
      });
    }

    if (opts.new) {
      copyFile({ from: templatePath, to: pagePath, pageName: pageName,
        filename: 'new', ext: ['.html', '.js', '.scss'],
        replaceWith: pageName + 'New'
      });
    }

    if (opts.show) {
      copyFile({ from: templatePath, to: pagePath, pageName: pageName,
        filename: 'show', ext: ['.html', '.js', '.scss'],
        replaceWith: pageName + 'Show'
      });
    }

    if (opts.edit) {
      copyFile({ from: templatePath, to: pagePath, pageName: pageName,
        filename: 'edit', ext: ['.html', '.js', '.scss'],
        replaceWith: pageName + 'Edit'
      });
    }
  }


  // Refactor into module ------------------------------------------
  function copyFile(opts) {
    var importStr, ext;

    if (!opts) return console.log('incomplete options');
    ext = opts.ext;
    if (typeof ext === 'string') {
      ext = [ext]; // turn string ext into array
    }

    // itterate through each file and process it
    ext.forEach(function(extension) {
      var filename;

      filename = opts.filename;

      // handle sass paritals by prepending underscore
      if (extension === '.scss') {
        importStr = "@import '../pages/" + opts.pageName + "/" + filename + "';\n"
        fs.appendFileSync('client/styles/_pages.scss', importStr)
        filename = "_" + filename;
      }

      // copy from default folder to destination folder and rename any
      // variables that may be in each file
      fs.copy(opts.from + filename + extension,
              opts.to   + filename + extension, function (err) {

        handleError(err);

        replace(opts.to + filename + extension, function(data) {
          var res, repl;
          if (opts.replaceWith) {
            repl = opts.replaceWith;
            res = data.replace(/compName/g, changeCase.camelCase(repl));
            return res.replace(/comp-name/g, changeCase.paramCase(repl));
          } else {
            res = data.replace(/compName/g, nameCase.camel);
            return res.replace(/comp-name/g, nameCase.hyphen);
          }
        });

        console.log('    Created:', opts.to+opts.filename+extension);
      });

    });

  }


};

// TODO refactor these into a module



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

