## Generate Scaffolding for Meteor

Automate the common tasks used when building a Meteor app. Create 'pages', components,  controllers, collections & more.
User customizable templates and configuration. Meteor Generate borrows a few conventions from Rails but it still stays true to Meteor.

***Chekout the [example blog][1] and fire it up to see the general structure it generates.***

### Init 
`mgen init` Scaffolds out the common folder structure. Additional folders & files are added as needed with additional 
generate commands. See the Wiki page for example useage and file structure.


### Components
`mgen comp <name>` Bits of re-useable page independent widgets. These are often things like headers, footers, posts
parent with child post, etc... See the Wiki page for example useage and file structure.


### Pages
`mgen page <name>` Create conceptual 'pages'. Creates template, script, and stylesheet in 'client/pages/'.  
Note, this will not generate controllers and routes. See the Wiki page for example useage and file structure.

### Controllers
Coming Soon

### Collections
Coming Soon

[1]: https://github.com/AdamBrodzinski/meteor-generate/tree/master/examples/blog
