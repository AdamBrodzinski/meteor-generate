require('chai').should()
parseName = require '../lib/parse_name'


describe '#parseName', ->

  it 'should not change a one word singular root name', ->
    name = parseName 'foo'
    name.camelSingular.should.equal  'foo'
    name.snakeSingular.should.equal  'foo'
    name.hyphenSingular.should.equal 'foo'
    name.camel.should.equal   'foo'
    name.snake.should.equal   'foo'
    name.hyphen.should.equal  'foo'

  it 'should not change a one word plural root name', ->
    name = parseName 'bars'
    name.camelPlural.should.equal  'bars'
    name.snakePlural.should.equal  'bars'
    name.hyphenPlural.should.equal 'bars'
    name.camel.should.equal   'bars'
    name.snake.should.equal   'bars'
    name.hyphen.should.equal  'bars'

  # ----------- Convert to CamelCase -------------

  it 'should convert singular root name to singular camel case', ->
    name = parseName 'foo_bar'
    name.camelSingular.should.equal 'fooBar'
    name.camel.should.equal  'fooBar'

  it 'should convert plural root name to singular camel case', ->
    name = parseName 'foo_bars'
    name.camelSingular.should.equal 'fooBar'
  
  it 'should convert plural root name to plural camel case', ->
    name = parseName 'bar_posts'
    name.camelPlural.should.equal 'barPosts'
    name.camel.should.equal  'barPosts'

  it 'should convert singular root name to plural camel case', ->
    name = parseName 'bar_post'
    name.camelPlural.should.equal 'barPosts'
    

  # ----------- Convert to snake_case -------------

  it 'should convert singular root name to snake case', ->
    name = parseName 'foo_bar'
    name.snake.should.equal 'foo_bar'
    name.snakeSingular.should.equal 'foo_bar'
    name = parseName 'foo-bar'
    name.snake.should.equal 'foo_bar'

  it 'should convert plural root name to singular snake case', ->
    name = parseName 'foo_bars'
    name.snakeSingular.should.equal 'foo_bar'
    name = parseName 'foo-bars'
    name.snakeSingular.should.equal 'foo_bar'

  it 'should convert plural root name to plural snake case', ->
    name = parseName 'bar_posts'
    name.snakePlural.should.equal 'bar_posts'
    name.snake.should.equal  'bar_posts'
    name = parseName 'bar-posts'
    name.snakePlural.should.equal 'bar_posts'

  it 'should convert singular root name to plural snake case', ->
    name = parseName 'foo_post'
    name.snakePlural.should.equal 'foo_posts'

  # ----------- Convert to snake_case -------------

  it 'should convert singular root name to singular hyphen case', ->
    name = parseName 'foo_bar'
    name.hyphenSingular.should.equal 'foo-bar'
    name.hyphen.should.equal  'foo-bar'

  it 'should convert plural root name to singular hyphen case', ->
    name = parseName 'foo_bars'
    name.hyphenSingular.should.equal 'foo-bar'
  
  it 'should convert plural root name to plural hyphen case', ->
    name = parseName 'bar_posts'
    name.hyphenPlural.should.equal 'bar-posts'
    name.hyphen.should.equal  'bar-posts'

  it 'should convert singular root name to plural hyphen case', ->
    name = parseName 'bar_post'
    name.hyphenPlural.should.equal 'bar-posts'

  # ----------- Convert to PascalCase -------------

  it 'should convert singular root name to singular pascal case', ->
    name = parseName 'foo_bar'
    name.pascalSingular.should.equal 'FooBar'
    name.pascal.should.equal  'FooBar'

  it 'should convert plural root name to singular pascal case', ->
    name = parseName 'foo_bars'
    name.pascalSingular.should.equal 'FooBar'
  
  it 'should convert plural root name to plural pascal case', ->
    name = parseName 'bar_posts'
    name.pascalPlural.should.equal 'BarPosts'
    name.pascal.should.equal  'BarPosts'

  it 'should convert singular root name to plural pascal case', ->
    name = parseName 'bar_post'
    name.pascalPlural.should.equal 'BarPosts'

