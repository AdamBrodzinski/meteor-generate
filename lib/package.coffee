# Meteor Generate
# Copyright(c) 2014 Adam Brodzinski <adambrodzinski@gmail.com>
# MIT Licensed

fs = require 'fs-extra'
global.templatePath ||= 'TEST_PATH'
 
class Package
  dest: './packages/'
  template: "#{templatePath}/package"


  # Public Creates a package by copying template folder to users
  # folder, then renames any variables found inside. Appends the
  # package name to `.meteor/packages` file. 
  # 
  # Examples:
  #   require('./package').create('mixpanel')
  #
  # packageName - The {String} name of the package
  #
  create: (packageName) ->
    @copyTemplate(packageName)
    @renamePackage()
    # Append package to Meteor packages
    fs.appendFileSync('./.meteor/packages', packageName)
  

  # Private: Copy the package template folder to client root folder.
  # Renames it to packageName
  #
  # packageName - The {String} name of the package
  #
  copyTemplate: (packageName) ->
    fs.copySync(this.template, this.dest + packageName)
  

  # Private: Renames any template variables found inside of the 
  # template files
  #
  renamePackage: () ->


module.exports = Package

