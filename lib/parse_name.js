
/** Parse a root name and return it's singular and plural
 *  names in various cases. It returns an object with singular
 *  and plural names. Access them with .camelS for singular,
 *  .camelP for pluralized case, and .camel for original pluralization.
 *  camelCase, snake_case, and hyphen-case are available in return object.
 *
 *  return example passing in 'foo_posts':
 *  {
      camel:   'fooPosts'
      snake:   'foo_posts',
      hyphen:  'foo-posts',
      camelS:  'fooPost'
      snakeS:  'foo_post',
      hyphenS: 'foo-post',
      camelP:  'fooPosts',
      snakeP:  'foo_posts',
      hyphenP: 'foo-posts'
 *  }
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
    camel: changeCase.camel(rootName),
    snake: changeCase.snake(rootName),
    hyphen: changeCase.param(rootName),

    camelS: changeCase.camel(singularRoot),
    snakeS: changeCase.snake(singularRoot),
    hyphenS: changeCase.param(singularRoot),

    camelP:  changeCase.camel(pluralRoot),
    snakeP:  changeCase.snake(pluralRoot),
    hyphenP: changeCase.param(pluralRoot)
  };
};

