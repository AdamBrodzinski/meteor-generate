require('chai').should()
rename = require '../lib/rename'

describe 'Change Case Module', ->

  it 'should transform a camelCased singular variable', ->
    newText = rename "bars", "Hello __name-singular-camel__ End"
    newText.should.equal "Hello bar End"

  it 'should transform a camelCased plural variable', ->
    newText = rename "bars", "Hello __name-plural-camel__ End"
    newText.should.equal "Hello bars End"

