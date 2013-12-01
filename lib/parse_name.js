
/** Parse a root name and return it's singular and plural
 *  names in various cases. It returns an object with singular
 *  and plural names. Access them with .camel for singular and
 *  .camelP for pluralized camel case.
 *
 * @param rootName {String} - root name to convert from
 * @return         {Object}
 * @api public
 */
module.exports = function(rootName) {
  var changeCase, pluralize, singularRoot, pluralRoot;

  changeCase = require('change-case');
  pluralize = require('pluralize');

  singularRoot = pluralize.singular(rootName);
  pluralRoot =   pluralize.plural(rootName);
  
  return {
    camel: changeCase.camel(singularRoot),
    snake: changeCase.snake(singularRoot),
    hyphen: changeCase.param(singularRoot),

    camelP:  changeCase.camel(pluralRoot),
    snakeP:  changeCase.snake(pluralRoot),
    hyphenP: changeCase.param(pluralRoot)
  };
};

