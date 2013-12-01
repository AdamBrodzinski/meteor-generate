require('chai').should()

describe 'rename.getNames', ->
  it 'should convert root name to camel case', ->
    'foo'.should.equal 'bar'
