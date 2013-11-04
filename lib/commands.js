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


// fire up Commander
prog.parse(process.argv);

