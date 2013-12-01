require('chai').should()
parseName = require '../lib/parse_name'


describe 'parseName', ->

  # ----------- Convert to CamelCase -------------

  it 'should convert singular root name to singular camel case', ->
    name = parseName 'foo_bar'
    name.camel.should.equal 'fooBar'

  it 'should convert plural root name to singular camel case', ->
    name = parseName 'foo_bars'
    name.camel.should.equal 'fooBar'

  # ----------- Convert to snake_case -------------

  it 'should convert singular root name to snake case', ->
    name = parseName 'foo_bar'
    name.snake.should.equal 'foo_bar'
    name = parseName 'foo-bar'
    name.snake.should.equal 'foo_bar'

  it 'should convert plural root name to singular snake case', ->
    name = parseName 'foo_bars'
    name.snake.should.equal 'foo_bar'
    name = parseName 'foo-bars'
    name.snake.should.equal 'foo_bar'

  # ----------- Convert to snake_case -------------

  it 'should convert singular root name to singular hyphen case', ->
    name = parseName 'foo_bar'
    name.hyphen.should.equal 'foo-bar'

  it 'should convert plural root name to singular hyphen case', ->
    name = parseName 'foo_bars'
    name.hyphen.should.equal 'foo-bar'
  
