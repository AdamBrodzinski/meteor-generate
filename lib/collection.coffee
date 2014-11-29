# Meteor Generate
# Copyright(c) 2014 Adam Brodzinski <adambrodzinski@gmail.com>
# MIT Licensed

fs = require 'fs-extra'
transformVariables = require './rename'
parseName = require './parse_name'


# Public: Creates a collection string and inserts it into the user's
# collections file. File extension can be changed in the future when
# more langs are supported.
#
# collName - The {String} name of the mongo collection to create/connect
# opts - The options
#    :extension - {String} file extension
#
class Collection
  constructor: (collName, opts) ->
    @fileExt = opts.extension || '.js'
    @nameCamel = parseName(collName).camel
    @insertCollection()

  # private

  insertCollection: () ->
    collectionLine = @generateCollectionString()
    @appendToCollectionsFile(collectionLine)

  generateCollectionString: ->
    return "db.#{@nameCamel} = new Meteor.Collection('#{@nameCamel}');\n"

  appendToCollectionsFile: (line) ->
    filename = "./both/lib/collections#{@fileExt}"
    fs.appendFileSync(filename, line)
    puts("    Inserting #{@nameCamel} collection into #{filename}")

module.exports = Collection

