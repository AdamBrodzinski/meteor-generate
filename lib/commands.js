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
    puts('  Create a component boilerplate folder including a HTML template, JS, & Sass file.');
    puts('  Plural item names will produce a parent & child component. e.g. posts with child post');
    puts("  If a component name has multiple words use 'snake_case'");
    puts();
    puts('  Examples:');
    puts('  $ mgen comp posts');
    puts('  $ mgen comp widget_delux');
    puts();
  });


// Page Command
// copies a Meteor page boilerplate folder and moves it into client/page directory.
prog.command('page <page_name>')
  .description('Create a page folder with HTML, JS, and Sass files')

  .option("-d, --directory <path>", "Change the default component directory 'client/pages'", "client/pages/")
  .option("-i, --index", "Only create an 'index' page")
  .option("-n, --new",   "Only create a 'new' page")
  .option("-s, --show",  "Only create a 'show' page")
  .option("-e, --edit",  "Only create an 'edit' page")

  .action(function(pageName, options){
    require('./page').run(pageName, options);
  })
  
  .on('--help', function() {
    puts('  Create a page boilerplate folder including a HTML template, JS, & Sass file.');
    puts("  By default all crud actions will be generated, e.g., new.js, show.js, edit.js, index.js");
    puts("  Pass --show flag to only generate show.js, show.html, etc..");
    puts("  If a page name has multiple words use 'snake_case'");
    puts();
    puts('  Examples:');
    puts('  $ mgen page users');
    puts();
  });

// fire up Commander
prog.parse(process.argv);

// make printing look a bit nicer
function puts(msg, param1) {
  if (!param1)
    console.log(msg || '');
  else
    console.log(msg, param1);
}

