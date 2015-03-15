# Meteor Generate
# Copyright(c) 2014 Adam Brodzinski <adambrodzinski@gmail.com>
# MIT Licensed
#
# Namespaces are used for each resource in a Meteor project. For examples the
# Posts resource would have a namespace of `Posts`. Controllers and helpers
# can be inserted in them such as `Posts.destroy()`

fs = require "fs-extra"
parseName = require './parse_name'

class Namespace
  nsFile: "both/lib/_namespaces.js",

  # Public: Create a namespaces file. Copies over from templates if it
  # doesn"t yet exist.
  #
  createFile: ->
    namespaceExists = fs.existsSync("both/lib/_namespaces.js")
    unless namespaceExists
      fs.copySync("#{templatePath}lib/_namespaces.js", "both/lib/_namespaces.js")
      puts "    Created: both/lib/_namespaces.js"


  # Public: Add a namespace to the namespaces file. Allows user to stuff
  # things related to a namespace in one area. Checks to make sure
  # namespace isn"t already inside file.
  #
  # resName - The {String} name of the resource, eg `posts`
  #
  add: (resName) ->
    resName = parseName(resName).pascalPlural
    contrNamespace = "this.#{resName}Controller = {};\n"
    nsFileStr = fs.readFileSync(@nsFile, {encoding: "utf-8"})
    namespaceExists = nsFileStr.match(contrNamespace)

    unless namespaceExists
      fs.appendFileSync(this.nsFile, contrNamespace)
      puts "    Added: #{resName}Controller namespace"


module.exports = Namespace

