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
      copyTemplates();
      console.log('\n  create '+ destPath);
    }
  });

  var templatePath = pageTemplates + 'page_action';
  var pagePath     = destPath;

  function copyTemplates() {
    copyFile({ source: templatePath, dest: pagePath,
      filename: 'new', ext: ['.html', '.js', '.scss'],
      replaceWith: nameCase.snake + '_new'
    });

  }






  // Refactor into module ------------------------------------------
  function copyFile(opts) {
    if (!opts) return console.log('incomplete options');
    var ext = opts.ext;
    if (typeof ext === 'string') {
      ext = [ext]; // turn string ext into array
    }

    ext.forEach(function(extension) {

      fs.copy(opts.source+extension,
              opts.dest+opts.filename+extension, function (err) {

        handleError(err);
        replace(opts.dest+opts.filename+extension, function(data) {
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
        console.log('  create', opts.dest+opts.filename+extension);
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

