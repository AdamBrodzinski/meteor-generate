# Meteor Generate
# Copyright(c) 2015 Adam Brodzinski <adambrodzinski@gmail.com>
# MIT Licensed

fs = require 'fs-extra'
transformVariables = require './rename'
parseName = require './parse_name'

class Model
  constructor: (modelName, opts) ->
    @ext = '.js'
    @modelName = parseName(modelName).camelSingular
    @template = "#{templatePath}model/model#{@ext}"
    @destFile = "both/models/#{@modelName + @ext}"

    @copyTemplateFiles()
    @renameVariablesInTemplate()
    @printConfirmation()

  # Private Methods

  copyTemplateFiles: ->
    modelExists = fs.existsSync(@destFile)
    fs.copySync(@template, @destFile) unless modelExists

  renameVariablesInTemplate: ->
    template = fs.readFileSync(@destFile, {encoding: "utf-8"})
    newTemplateStr = transformVariables(@modelName, template)
    fs.writeFileSync(@destFile, newTemplateStr)

  printConfirmation: ->
    puts "Created Model: #{@destFile}"

module.exports = Model

