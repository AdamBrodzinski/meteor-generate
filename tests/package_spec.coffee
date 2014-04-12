require './spec_helper'
rewire = require "rewire"
Package = rewire '../lib/package'


describe 'Package Module', ->
  before ->
    global.templatePath = 'test_path'

    Package.__set__("fs", {
      copySync: -> "copy success"
      appendFileSync: -> "append success"
    })

  it 'should create a new instance', ->
    pack = new Package()
    create = sinon.spy(pack, 'create')
    copyTemp = sinon.spy(pack, 'copyTemplate')
    rename = sinon.spy(pack, 'renamePackage')
    fsp = sinon.spy(fs, 'appendFileSync')
    pack.create('myTemplate')

    pack.dest.should.eq './packages/'
    pack.template.should.eq 'test_path/package'
    copyTemp.should.have.been.calledWith 'myTemplate'
    rename.should.have.been.calledOnce
    fsp.should.have.been.calledWithExactly './.meteor/packages', 'myTemplate'

