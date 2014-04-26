require './spec_helper'
Package = rewire '../lib/package'

describe 'Package Module', ->

  before ->
    global.templatePath = 'test_path'

    Package.__set__("fs", {
      copySync: -> "copy success"
      existsSync: -> false
      appendFileSync: -> "append success"
    })

  it 'should create a new instance', ->
    pack = new Package()
    create = sinon.spy(pack, 'create')
    copyTemp = sinon.spy(pack, 'copyTemplate')
    rename = sinon.spy(pack, 'renamePackage')
    fsp = sinon.spy(fs, 'appendFileSync')
    pack.create('myTemplate')

    copyTemp.should.have.been.calledWith 'myTemplate'
    rename.should.have.been.calledOnce
    fsp.should.have.been.calledWithExactly './.meteor/packages', 'myTemplate'

  it "should copy the package template folder to clients root folder", ->
    pack = new Package()
    copy = sinon.spy(fs, 'copySync')
    pack.copyTemplate('packageDeluxe')
    path = 'test_path/package'
    dest = './packages/packageDeluxe'

    copy.should.have.been.calledWith(path, dest)
    copy.should.have.returned 'copy success'

