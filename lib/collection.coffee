# Meteor Generate
# Copyright(c) 2014 Adam Brodzinski <adambrodzinski@gmail.com>
# MIT Licensed

fs = require 'fs-extra'
transformVariables = require './rename'
parseName = require './parse_name'


class Collection
  constructor: (collName, opts) ->
    @collName = parseName(collName)
    @collName.original = collName
    @templatePath = templatePath + 'collection/'
    console.log "Collection", @collName
    puts @templatePath

module.exports = Collection

