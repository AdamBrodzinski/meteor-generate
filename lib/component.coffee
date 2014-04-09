# Meteor Generate
# Copyright(c) 2014 Adam Brodzinski <adambrodzinski@gmail.com>
# MIT Licensed
#
# Generate a component folder containing an HTML template, JavaScript file
# and a Sass file. The Sass file import is also appended to /client/sass/comps

fs = require('fs-extra')
changeCase = require('change-case')



handleError = (err) ->
  if (err)
    puts('\nError Creating File')
    puts(err.stack)
    process.exit(1)

replace = (file, callback) ->
  fs.readFile(file, 'utf8', (err,data) ->
    if (err)
      return puts(err)

    result = callback(data)

    fs.writeFile(file, result, 'utf8',  (err) ->
      if (err)
        return puts(err)
    )
  )



exports.run = (compName, opts) ->

  nameCase = {
    snake:  compName,
    camel:  changeCase.camelCase(compName),
    hyphen: changeCase.paramCase(compName)
  }

  compTemplates = templatePath + 'component/'
  destPath = opts.directory + compName + '/'

  # create a directory in components folder
  fs.mkdirs(destPath,  (err) ->
    if (err)
      console.error('\nError creating directory')
      console.error(err)
    else
      copyTemplates()
      puts('Created '+nameCase.snake+' directory in ' + destPath)
  )

  source = compTemplates + 'comp_name'
  dest =   destPath + nameCase.snake

   # Copy Boilerplate from Cache
   #
   #  Boilerplate files are copied from ~/.mgen unless an
   #  alternative path was provided.
   #
  copyTemplates = () ->
    # Create HTML template file
    fs.copy(source+'.html', dest+'.html',  (err) ->
      handleError(err)
      replace(dest+'.html', (data) ->
        res = data.replace(/compName/g, nameCase.camel)
        return res.replace(/comp-name/g, nameCase.hyphen)
      )
      puts('  Created HTML Template')
    )

    # Create JavaScript file
    fs.copy(source+'.js', dest+'.js',  (err) ->
      handleError(err)
      replace(dest+'.js', (data) ->
        return data.replace(/compName/g, nameCase.camel)
      )
      puts('  Created JavaScript File')
    )

    # Create Sass file
    fs.copy(source+'.scss', destPath+'_'+nameCase.snake+'.scss',  (err) ->
      handleError(err)
      replace(destPath+'_'+nameCase.snake+'.scss', (data) ->
        return data.replace(/comp-name/g, nameCase.hyphen)
      )
      puts('  Created Sass File')
    )


