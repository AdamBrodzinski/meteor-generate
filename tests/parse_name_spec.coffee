require('chai').should()
parseName = require '../lib/parse_name'


describe '#parseName', ->

  it 'should not change a one word singular root name', ->
    name = parseName 'foo'
    name.camelS.should.equal  'foo'
    name.snakeS.should.equal  'foo'
    name.hyphenS.should.equal 'foo'
    name.camel.should.equal   'foo'
    name.snake.should.equal   'foo'
    name.hyphen.should.equal  'foo'

  it 'should not change a one word plural root name', ->
    name = parseName 'bars'
    name.camelP.should.equal  'bars'
    name.snakeP.should.equal  'bars'
    name.hyphenP.should.equal 'bars'
    name.camel.should.equal   'bars'
    name.snake.should.equal   'bars'
    name.hyphen.should.equal  'bars'

  # ----------- Convert to CamelCase -------------

  it 'should convert singular root name to singular camel case', ->
    name = parseName 'foo_bar'
    name.camelS.should.equal 'fooBar'
    name.camel.should.equal  'fooBar'

  it 'should convert plural root name to singular camel case', ->
    name = parseName 'foo_bars'
    name.camelS.should.equal 'fooBar'
  
  it 'should convert plural root name to plural camel case', ->
    name = parseName 'bar_posts'
    name.camelP.should.equal 'barPosts'
    name.camel.should.equal  'barPosts'

  it 'should convert singular root name to plural camel case', ->
    name = parseName 'bar_post'
    name.camelP.should.equal 'barPosts'
    

  # ----------- Convert to snake_case -------------

  it 'should convert singular root name to snake case', ->
    name = parseName 'foo_bar'
    name.snake.should.equal 'foo_bar'
    name.snakeS.should.equal 'foo_bar'
    name = parseName 'foo-bar'
    name.snake.should.equal 'foo_bar'

  it 'should convert plural root name to singular snake case', ->
    name = parseName 'foo_bars'
    name.snakeS.should.equal 'foo_bar'
    name = parseName 'foo-bars'
    name.snakeS.should.equal 'foo_bar'

  it 'should convert plural root name to plural snake case', ->
    name = parseName 'bar_posts'
    name.snakeP.should.equal 'bar_posts'
    name.snake.should.equal  'bar_posts'
    name = parseName 'bar-posts'
    name.snakeP.should.equal 'bar_posts'

  it 'should convert singular root name to plural snake case', ->
    name = parseName 'foo_post'
    name.snakeP.should.equal 'foo_posts'

  # ----------- Convert to snake_case -------------

  it 'should convert singular root name to singular hyphen case', ->
    name = parseName 'foo_bar'
    name.hyphenS.should.equal 'foo-bar'
    name.hyphen.should.equal  'foo-bar'

  it 'should convert plural root name to singular hyphen case', ->
    name = parseName 'foo_bars'
    name.hyphenS.should.equal 'foo-bar'
  
  it 'should convert plural root name to plural hyphen case', ->
    name = parseName 'bar_posts'
    name.hyphenP.should.equal 'bar-posts'
    name.hyphen.should.equal  'bar-posts'

  it 'should convert singular root name to plural hyphen case', ->
    name = parseName 'bar_post'
    name.hyphenP.should.equal 'bar-posts'

