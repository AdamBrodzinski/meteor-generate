## Generate Scaffolding for Meteor

### Notice
I'm switching over my new apps to using React for the view layer and FlowRouter with serverside rendering. Checkout the react branch for updates on this. I'll still leave this branch the same for my (and your) legacy apps.

Automate the common tasks used when building a Meteor app. Create 'pages', components,  controllers, collections & more.
User customizable templates and configuration. Meteor Generate borrows a few conventions from Rails but it still stays true to Meteor.

### Installation
`sudo install meteor-generate --global`  

### Create
`mgen create <project_name>` Runs Meteor create command and scaffolds out a basic app structure.
`mgen create myblog` creates the following files:

```
└── myblog
    ├── both
    │   ├── lib
    │   │   ├── _namespaces.js
    │   │   └── collections.js
    │   └── routes.js
    │
    ├── client/
    │   └── _startup.js
    │   └── main.html
    │   └── styles/
    │       ├── _components.scss
    │       ├── _pages.scss
    │       └── main.scss
    │
    ├── server/
    │
    ├── .jshintrc
    ├── .jshintignore
    ├── makefile
    └── smart.json
```


### Components
`mgen component <name>` Re-useable widgets that are not tied to a page. These should be able to be included in any page on the app. These are typically things like the header, footer, etc... Appends the Sass import into the `styles/_components.scss` file.
`mgen comp header` outputs the follwing:

```
└── client
    └── components
        └── header
            ├── _header.scss
            ├── header.html
            └── header.js
```



### Pages
`mgen page <name> <action>` Create conceptual 'pages'. Creates template, script, and stylesheet. No controllers are generated.
If no action flag is passed in, all actions will be created. Possible actions: index, show, new, and edit.
[See Example Pages][3] - `mgen page posts --index` creates the following:

```
└── client
    └── pages
        └── posts
            ├── index.html
            ├── index.js
            └── _index.scss
```


### Controllers
`mgen controller <name> <actions>` Creates controllers for Iron-Router, adds routes, creates pages for controllers. If only `create`, `update`, or `destroy` actions are passed, no pages are created. These are data only controllers. A namespace file is created if it doesn't exist which adds a `db` namespace for collections. This allows for a natural `db.posts.find(...)` synatax. Creating a posts controller adds a `PostsController` namespace. For example, `PostsController.create()` Possible actions: index, new, show, edit, create, update, and destroy. If no actions are passed, all will be created.
See [Example Controller][4]  - `mgen controller posts --show` generates the following:

```
├── both
│   ├── controllers
│   │   ├── _app.js
│   │   └── posts.js
│   ├── lib
│   │   └── namespaces.js   // adds a `db` namespace and `Posts` namespace
│   └── routes.js
│
└── client
    └── pages
        └── posts
            ├── show.html
            ├── show.js
            └── _show.scss
```

```javascript
// show edit page for single Post : /posts/edit/:id
PostsController.Edit = AppController.extend({
  template: 'postsEdit',

  waitOn: function() {
    //return Meteor.subscribe('post', this.params.id);
  },

  data: function() {
    //return Post.findOne(this.params.id);
  },

  onBeforeAction: function() {
    console.log("  [PostsController.Edit]: loading", this.url);
    this.next();
  }
});

// controller to do something when complete
PostsController.create = function(data, callback) {
  console.log('Fired Create Post');

  // call Post model here...
  Post.create(data, function(err, id){
    if (callback) callback(err, id);
    if (err) return alert(err.reason);

    Router.go('/somewhere');
  });
};
```


### Packages

`mgen package <name>` Creates a Meteor smart package. Flags for client/server/both coming soon.  
`mgen package mixpanel` Generates the following:

```
└── packages
    └── mixpanel
        ├── both.js
        ├── client.js
        ├── package.js
        ├── server.js
        └── smart.json
```


### Collections

Creates a Meteor collection in the `both/lib/collections.js` file. Collections
are inserted into the `db` namespace, access them with `db.posts.find(...)` Passing in `mgen collection posts` generates the following:

`db.posts = new Meteor.Collection('posts');`


### Models
Coming Soon


### Publications

Creates a publication on the server. Publications are stored in the `server/publications` directory inside of a script file file with the same name as the resource. Passing in  
`mgen publish post:userPost` will generate a 'userPost' publication for the resource 'post'.

```
Meteor.publish('userPost', function() {
  // TODO index query
  // XXX bad performance no limit
  return db.posts.find({});
});
```

### Tests
Coming Soon. Meteor Generate will create tests for Velocity for you by default.


### Custom Templates / Config
Generators are only helpful if they save you time.

Soon, you will be able to define your own templates folder so that you can include things like form helpers, test helpers... anything you want. A project level mgen config file will help team members sync settings and reduce command line flags.




***[Example blog][1] fire it up to see the general structure it generates.*** **note this has extra logic added in**

[1]: https://github.com/AdamBrodzinski/meteor-generate/tree/master/examples/blog
[2]: https://github.com/AdamBrodzinski/meteor-generate/tree/master/examples/blog/client/pages/posts
[3]: https://github.com/AdamBrodzinski/meteor-generate/tree/master/examples/blog/client/pages
[4]: https://github.com/AdamBrodzinski/meteor-generate/blob/master/examples/blog/both/controllers/posts.js
