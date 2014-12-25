# Meteor Generate
# Copyright(c) 2014 Adam Brodzinski <adambrodzinski@gmail.com>
# MIT Licensed

fs = require 'fs-extra'
transformVariables = require './rename'
parseName = require './parse_name'


class Publish
  constructor:(pubParams, opts) ->
    @opts = opts
    @ext = '.js'
    params = @parseParams(pubParams)
    @filename = params.resourceName + @ext
    @pubName = params.pubName
    @resName = params.resourceName
    @pubsPath = "server/publications/"
    @fullFilePath = @pubsPath + @filename
    @templatePath = "#{templatePath}publish/publish" + @ext

    @createPublicationFile()
    @appendTemplateIntoPubFile()
    puts "Inserted '#{@pubName}' into #{@fullFilePath}"

  # private

  createPublicationFile: ->
    fs.ensureFileSync(@fullFilePath)

  appendTemplateIntoPubFile: ->
    template = fs.readFileSync(@templatePath, {encoding: "utf-8"})
    template = @renameTemplateVariables(template)
    fs.appendFileSync(@fullFilePath, template)

  # returns transformed {String}
  renameTemplateVariables: (tmpl) ->
    tmplString = transformVariables(@resName, tmpl)
    tmplString = tmplString.replace('__pub-name__', @pubName)

  # find the filename and publication name
  parseParams:(params) ->
    # splits `posts:userPosts` into ['posts:userPosts','posts','userPosts']
    matches = params.match(/^([^:]+):([^:]+)$/)
    if !matches || !matches[1] || !matches[2]
      @printBadSynaxHelp()
      process.exit(1)
    else
      return {resourceName: matches[1], pubName: matches[2]}

  printBadSynaxHelp: ->
    puts "\nBad Publish Name Syntax, see mgen publish --help"
    puts '\n Example:'
    puts '   $ mgen publish collectionName:publishName'
    puts '   $ mgen publish posts:userPost\n'

module.exports = Publish

