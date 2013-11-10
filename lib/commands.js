var prog = require('commander');

// global template directory
// TODO add this to config file
templateDir = '/Users/adam/.mgen/';

// Main mgen command options
prog
  .version('0.0.1');


// Components Command
// copies a Meteor component boilerplate folder and moves it into component directory.
prog.command('comp <component_name>')
  .description('Create a component template, JS, and Sass files')

  .option("-d, --directory <path>", "Change the default component directory 'client/components'", "client/components/")

  .action(function(compName, options){
    require('./component').run(compName, options);
  })
  
  .on('--help', function() {
    console.log('  Create a component boilerplate folder including a HTML template, JS, & Sass file.');
    console.log('  Plural item names will produce a parent & child component. e.g. posts with child post');
    console.log("  If a component name has multiple words use 'snake_case'");
    console.log();
    console.log('  Examples:');
    console.log('  $ mgen comp posts');
    console.log('  $ mgen comp widget_delux');
    console.log();
  });


// Page Command
// copies a Meteor page boilerplate folder and moves it into client/page directory.
prog.command('page <page_name>')
  .description('Create a page folder with HTML, JS, and Sass files')

  .option("-d, --directory <path>", "Change the default component directory 'client/pages'", "client/pages/")

  .action(function(pageName, options){
    require('./page').run(pageName, options);
  })
  
  .on('--help', function() {
    console.log('  Create a page boilerplate folder including a HTML template, JS, & Sass file.');
    console.log("  By default all crud actions will be generated, e.g., new.js, show.js, edit.js, index.js");
    console.log("  Pass --show flag to only generate show.js, show.html, etc..");
    console.log("  If a page name has multiple words use 'snake_case'");
    console.log();
    console.log('  Examples:');
    console.log('  $ mgen page users');
    console.log();
  });

// fire up Commander
prog.parse(process.argv);

