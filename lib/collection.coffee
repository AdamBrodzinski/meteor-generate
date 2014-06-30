# Meteor Generate
# Copyright(c) 2014 Adam Brodzinski <adambrodzinski@gmail.com>
# MIT Licensed

fs = require 'fs-extra'
transformVariables = require './rename'
parseName = require './parse_name'


class Collection
  constructor: (collName, opts) ->
    @scriptExt = opts.extension || '.js'
    @nameCamel = parseName(collName).camel
    @nameSnake = parseName(collName).snake
    @templatePath = templatePath + 'collection/'
    @insertCollection()

  # private

  insertCollection: () ->
    collectionLine = @generateCollectionString()
    @appendToCollectionFile(collectionLine)


  generateCollectionString: ->
    nameLower = @nameSnake.toLowerCase()
    return "db.#{@nameSnake} = new Meteor.Collection('#{nameLower}');\n"


  appendToCollectionFile: (line) ->
    filename = "./both/lib/collections#{@scriptExt}"
    fs.appendFileSync(filename, line)
    

    

module.exports = Collection

