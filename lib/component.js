// generate a component folder with its files

//var mkdir = require('mkdirp');
var cp = require('cpr');

exports.run = function(compName) {

  cp('/Users/adam/.mgen/component/', './client/components/' + compName, {
    deleteFirst: false, // Delete "to" before
    overwrite: false,   // If the file exists, overwrite it
    confirm: true       // After the copy, stat all the copied files to make sure they are there
  }, function(errs, files) {
    console.log(errs);
    console.log(files);
    //errs - Array of errors that occurred
    //files - List of files that we copied
  });

};

