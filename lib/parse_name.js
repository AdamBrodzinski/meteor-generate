
/** Parse a root name and return it's singular and plural
 *  names in various cases. It returns an object with singular
 *  and plural names. Access them with .camel for singular and
 *  .camelP for pluralized case. camelCase, snake_case, and
 *  hyphen-case are available in returned object.
 *
 *  return example passing in 'foo_post' or 'foo_posts':
 *  {
      camel:   'fooPost'
      snake:   'foo_post',
      hyphen:  'foo-post',
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
    camel: changeCase.camel(singularRoot),
    snake: changeCase.snake(singularRoot),
    hyphen: changeCase.param(singularRoot),

    camelP:  changeCase.camel(pluralRoot),
    snakeP:  changeCase.snake(pluralRoot),
    hyphenP: changeCase.param(pluralRoot)
  };
};

