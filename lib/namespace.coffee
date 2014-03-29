# Meteor Generate
# Copyright(c) 2014 Adam Brodzinski <adambrodzinski@gmail.com>
# MIT Licensed
#
# Namespaces are used for each resource in a Meteor project. For examples the
# Posts resource would have a namespace of `Posts`. Controllers and helpers
# can be inserted in them such as `Posts.destroy()`

fs = require "fs-extra"

class Namespace
  nsFile: "both/lib/namespaces.js",

  # Public: Create a namespaces file. Copies over from templates if it
  # doesn"t yet exist.
  #
  createFile: ->
    nameSpaceExists = fs.existsSync("both/lib/namespaces.js")
    unless nameSpaceExists
      fs.copySync("#{templatePath}lib/namespaces.js", "both/lib/namespaces.js")
      puts "    Created: both/lib/namespaces.js"


  # Public: Add a namespace to the namespaces file. Allows user to stuff
  # things related to a namespace in one area. Also used for controllers.
  # Checks to make sure namespace isn"t already inside file.
  #
  # resName - The {String} name of the resource, eg `posts`
  #
  add: (resName) ->
    namespace = "#{resName} = {}\n"
    nsFileStr = fs.readFileSync(@nsFile, {encoding: "utf-8"})
    namespaceExists = nsFileStr.match(namespace)

    unless namespaceExists
      fs.appendFileSync(this.nsFile, namespace)
      puts "    Added: #{resName} namespace"


module.exports = Namespace

