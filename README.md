## Generate Scaffolding for Meteor

Automate the common tasks used when building a Meteor app. Create 'pages', components,  controllers, collections & more.
User customizable templates and configuration. Meteor Generate borrows a few conventions from Rails but it still stays true to Meteor.

***[Example blog][1] fire it up to see the general structure it generates.*** **note this has extra logic added in**

### Init 
`mgen init <project_name>` Runs Meteor create command and scaffolds out a basic app structure. `mgen init myblog` creates the following files:

```
└── myblog  
    ├── both/
    │   └── routes.js
    │
    ├── client/
    │   └── head.html
    │   └── main.html
    │   └── styles/
    │
    ├── server/ 
    │
    ├── .jshintrc
    ├── .jshintignore
    ├── makefile
    └── smart.json
```


### Components
`mgen comp <name>` Bits of re-useable page independent widgets. These are often things like headers, footers, posts
parent with child post, etc...  Wiki page coming soon with example useage and file structure.


### Pages
`mgen page <name>` Create conceptual 'pages'. Creates template, script, and stylesheet in 'client/pages/'.  
[Example Template Contents][2]  Wiki page coming soon with example useage and file structure.

*example:* **mgen page posts --show**
```
both
server
client
  pages
    posts
      show.html
      show.js
      _show.scss
```


### Controllers
Coming Soon

### Collections
Coming Soon

[1]: https://github.com/AdamBrodzinski/meteor-generate/tree/master/examples/blog
[2]: https://github.com/AdamBrodzinski/meteor-generate/tree/master/examples/blog/client/pages/posts
