// Meteor Generate
// Copyright(c) 2014 Adam Brodzinski <adambrodzinski@gmail.com>
// MIT Licensed

var prog = require('commander'),
    path = require('path');

// make printing look a bit nicer
puts = function(msg, param1) {
  if (!param1)
    console.log(msg || '');
  else
    console.log(msg, param1);
}

// global template path
templatePath = path.resolve(__dirname + '/../' + 'templates/default/') + '/';

// Main mgen command options
prog.version('0.0.3');




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
  .option("-s, --show",  "Only create a 'show' page")
  .option("-n, --new",   "Only create a 'new' page")
  .option("-e, --edit",  "Only create an 'edit' page")

  .action(function(pageName, options){
    require('./page').run(pageName, options);
    console.log('Creating Pages');
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




// Controller Command
// create a controller and page template
prog.command('controller <name>')
  .description("Create a controller with it's associated pages. Routes are appended to both/routes.js")
  .option("-D, --directory <path>", "Change the default controller directory 'both/controllers/'\n", "both/controllers/")
  .option("-i, --index",  "Create an index controller  - Page of 'posts'")
  .option("-n, --new",    "Create a new controller     - Page to create 'a post'")
  .option("-s, --show",   "Create a show controller    - Page to show 'a post'")
  .option("-e, --edit",   "Create an edit controller   - Page to edit 'a post'")
  .option("-c, --create", "Create a create controller  - No page, No Route")
  .option("-u, --update", "Create an update controller - No page, No Route")
  .option("-d, --destroy", "Create a delete controller  - No page, No Route")

  .action(function(resourceName, opts){
    console.log('\nCreating Routes');
    require('./namespace').init();
    require('./router').create();
    require('./controller').init(resourceName, opts);
    console.log('Creating Pages');
  })

  .on('--help', function() {
    puts('  Create Iron Router controllers & their page templates. Routes are automatically appended');
    puts("  to the bottom of routes.js. To create a single page/controller, pass in it's action flag");
    puts();
    puts('  Data only controllers (create, update, destroy) do not create routes, but');
    puts('  allow you to organize data calls. Optional Meteor Methods in the future.');
    puts('  Run the `mrt` command to install Iron Router if this is the first time.');
    puts();
    puts('  Examples:');
    puts('  $ mgen controller posts  ( generate all controllers )');
    puts('  $ mgen controller posts --edit --new');
    puts('  $ mgen controller posts -en');
    puts('  $ mrt  #run mrt first time to install iron router');
    puts();
  });


// Init Command
prog.command('init <projectName>')
  .description('Scaffold out common files like .jshintrc, smart.json, and a makefile')

  .action(function(projectName, options){
    require('./init').init(projectName, options);
  })

  .on('--help', function() {
    console.log('  $ cd mybook');
    console.log();
    puts('Run the `mrt` command to install Iron Router if this is the first time.');
  });


// fire up Commander
prog.parse(process.argv);

