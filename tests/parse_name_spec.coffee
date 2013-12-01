require('chai').should()
parseName = require '../lib/parse_name'

describe 'parseName', ->

  it 'should convert root name to camel case', ->
    name = parseName 'fooBar'
    name.camel.should.equal 'foo_bar'

