require('chai').should()
Package = require '../lib/package'

describe 'Package Module', ->
  it 'should instantiate a new instance', ->
    pack = new Package()
    pack.dest.should.eq './packages/'
    pack.template.should.eq 'TEST_PATH/package'

