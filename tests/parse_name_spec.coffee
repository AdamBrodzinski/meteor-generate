require('chai').should()
parseName = require '../lib/parse_name'


describe 'parseName', ->

  it 'should convert root name to camel case', ->
    name = parseName 'foo_bar'
    name.camel.should.equal 'fooBar'

  it 'should convert root name to snake case', ->
    name = parseName 'fooBar'
    name.snake.should.equal 'foo_bar'

  it 'should convert root name to hyphen case', ->
    name = parseName 'foo_bar'
    name.hyphen.should.equal 'foo-bar'

