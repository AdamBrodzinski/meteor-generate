require('chai').should()
rename = require '../lib/rename'

describe 'Change Case Module', ->

  it 'should transform a camelCased singular variable', ->
    newText = rename "bars", "Hello __name-singular-camel__ End"
    newText.should.equal "Hello bar End"

  it 'should transform a camelCased plural variable', ->
    newText = rename "bars", "Hello __name-plural-camel__ End"
    newText.should.equal "Hello bars End"

  it 'should transform a hyphenated singular variable', ->
    newText = rename "foo_bars", "Hello __name-singular-hyphen__ End"
    newText.should.equal "Hello foo-bar End"

  it 'should transform a hyphenated plural variable', ->
    newText = rename "foo_bars", "Hello __name-plural-hyphen__ End"
    newText.should.equal "Hello foo-bars End"

  it 'should transform a snake_case singular variable', ->
    newText = rename "foo_bars", "Hello __name-singular-snake__ End"
    newText.should.equal "Hello foo_bar End"

  it 'should transform a snake_case plural variable', ->
    newText = rename "foo_bars", "Hello __name-plural-snake__ End"
    newText.should.equal "Hello foo_bars End"

