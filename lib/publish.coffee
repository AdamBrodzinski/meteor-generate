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
    @filename = params.filenameRoot + @ext
    @pubName = params.pubName
    @pubsPath = "server/publications/"
    @fullFilePath = @pubsPath + @filename

    #@createPublicationFile()
    #@appendTemplateIntoPubFile()
    #@renameTemplateVariables()
    puts "Inserted '#{@pubName}' into #{@fullFilePath}"

  # private

  # find the filename and publication name
  parseParams:(params) ->
    # splits `posts:userPosts` into ['posts:userPosts','posts','userPosts']
    matches = params.match(/^([^:]+):([^:]+)$/)
    if !matches || !matches[1] || !matches[2]
      throw new Error("Bad Publish Name Syntax, see mgen publish --help")
    else
      return {filenameRoot: matches[1], pubName: matches[2]}


module.exports = Publish

