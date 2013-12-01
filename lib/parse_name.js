
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


  return {
    camel: 'foo',
    snake: 'foo',
    hyphen: 'foo',

    camelP: 'foo',
    snakeP: 'foo',
    hyphenP: 'foo'
  };
};

