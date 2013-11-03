var prog = require('commander');

templateDir = '/Users/adam/.mgen/';

// Main mgen command options
prog
  .version('0.0.1')
  .option('-p, --peppers', 'Add peppers');


// Components Command
prog.command('comp <component_name>')
  .description('Create a component template, JS, and Sass files')

  .option("-d, --directory <path>", "Change the default directory [client/components]", "client/components/")

  .action(function(compName, options){
    require('./component').run(compName, options);
  })
  
  .on('--help', function() {
    console.log('  Plural item names will produce a parent & child component. e.g. posts with child post');
    console.log('  Use and underscore for any spaced and it will be camelcased and hyph.');
    console.log();
    console.log('  Examples:');
    console.log('    $ mgen comp post');
    console.log('    $ mgen comp posts');
    console.log('    $ mgen comp other_thing');
    console.log('    $ mgen comp other_things');
    console.log();
  });


// fire up Commander
prog.parse(process.argv);
