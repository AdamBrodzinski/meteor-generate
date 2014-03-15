// Renames variables in a stream of text. Used for converting generic templates
// into custom ones by renaming __name-pascal__ into `PostsThing`. Converts
// hyphen, camel, pascal, and original case (as passed in). See spec for all
// possible variable cases.
//
// Examples:
//     
//     oldText = "Greetings __name-pascal__";
//     var newText = require('./rename').transform('hello_world', oldText);
//     newText === "Greetings HelloWorld";
//
// resName - a {String} name, preferably snake_cased
// tmplStr - a UTF-8 {String} template, normally streamed from file
//
// Returns a {String} with transformed variables
//
module.exports = function(resName, tmplStr) {
  var res = require('./parse_name')(resName);
  var newTmpl = tmplStr;

  // transform camelCase template variables
  newTmpl = newTmpl.replace(/__name-singular-camel__/g, res.camelSingular);
  newTmpl = newTmpl.replace(/__name-plural-camel__/g, res.camelPlural);

  // transform hyphenated template variables
  newTmpl = newTmpl.replace(/__name-singular-hyphen__/g, res.hyphenSingular);
  newTmpl = newTmpl.replace(/__name-plural-hyphen__/g, res.hyphenPlural);

  // transform snakeCase template variables
  newTmpl = newTmpl.replace(/__name-singular-snake__/g, res.snakeSingular);
  newTmpl = newTmpl.replace(/__name-plural-snake__/g, res.snakePlural);

  // transform PascalCase template variables
  newTmpl = newTmpl.replace(/__name-singular-pascal__/g, res.pascalSingular);
  newTmpl = newTmpl.replace(/__name-plural-pascal__/g, res.pascalPlural);

  return newTmpl;
};

