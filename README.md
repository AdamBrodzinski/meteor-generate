## Generate Scaffolding for Meteor

Automate the common tasks used when building a Meteor app. Create 'pages', components,  controllers, collections & more.
User customizable templates and configuration. Meteor Generate borrows a few conventions from Rails but it still stays true to Meteor.


### Init 
`mgen init <project_name>` Runs Meteor create command and scaffolds out a basic app structure.  
`mgen init myblog` creates the following files:

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
`mgen comp <name>` Re-useable widgets that are not tied to a page. These should be able to be included in any page on the app. These are typically things like the header, footer, etc... `mgen comp header` outputs the follwing:  

```
└── client
    └── components
        └── header
            ├── _header.scss
            ├── header.html
            └── header.js
```



### Pages
`mgen page <name> <action>` Create conceptual 'pages'. Creates template, script, and stylesheet in 'client/pages/'.  
If no action flag is passed in, all actions will be created. `mgen page posts --index` creates the following:

```
└── client
    └── pages
        └── posts
            ├── index.html
            ├── index.js
            └── _index.scss
```


### Controllers
Coming Soon

### Collections
Coming Soon


***[Example blog][1] fire it up to see the general structure it generates.*** **note this has extra logic added in**

[1]: https://github.com/AdamBrodzinski/meteor-generate/tree/master/examples/blog
[2]: https://github.com/AdamBrodzinski/meteor-generate/tree/master/examples/blog/client/pages/posts
