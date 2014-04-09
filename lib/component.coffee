# Meteor Generate
# Copyright(c) 2014 Adam Brodzinski <adambrodzinski@gmail.com>
# MIT Licensed
#
# Generate a component folder containing an HTML template, JavaScript file
# and a Sass file. The Sass file import is also appended to /client/sass/comps


fs = require 'fs-extra'
transformVariables = require './rename'
changeCase = require 'change-case'
parseName = require './parse_name'


class Component
  constructor: (compName, opts) ->
    @compName = parseName(compName)
    @compName.original = compName
    @templatePath = templatePath + 'component/'
    @destPath = opts.directory + @compName.snake + '/'

    @copyTemplate()
    @renameAllTemplates()
    

  copyTemplate: () ->
    fs.copySync(@templatePath, @destPath)
    puts "\nComponent"
    puts "    Created: #{@compName.snake}.html"
    puts "    Created: #{@compName.snake}.js"
    puts "    Created: #{@compName.snake}._scss"


  renameAllTemplates: (compName) ->
    for extension in [".html", ".js", ".scss"]
      filePath = @destPath + "comp_name" + extension
      @renameTempateVariables(filePath)


  renameTempateVariables: (filePath) ->
    oldFileStr = fs.readFileSync(filePath, {encoding: 'utf-8'})
    newFileStr = transformVariables(@compName.original, oldFileStr)
    fs.writeFileSync(filePath, newFileStr)


module.exports = Component

