# Generate Scaffolding for Meteor

Are you tired of writing the same boilerplate over and over?  Automate the common tasks used when building a Meteor app. Create pages, components, models, controllers, collections & more. 

Get rid of your Meteor spaghetti. Uses Controllers, Models, and Service Objects to handle logic responsibilities. Pages and components handle views and view logic (using their own js files).

Based on architecture used in large production apps. Generates secure settings by default. Will soon generate passing specs unless the `--notests` flag is passed.

Customize the output with your own folder/file overrides so you can setup your own defaults.

--video--


### Installation
`sudo install meteor-generate --global`  


### Create a basic blog

To create an app with posts CRUD run the following:

`mgen create blog`  
`cd blog`  
`mgen collection posts`  
`mgen model post`  
`mgen controller posts`  
`mgen publish posts:post`  
`mgen publish post:post`  


### Commands

**`mgen create <projectName>`**  
Create a basic project structure with the minimum required to get a production app started. Includes the Iron Router, Browser Policy, Accounts-ui and Accounts Password packages (for model user validations).  
[See examples & details](http://foo)

**`mgen collection <collectionName>`**  
Creates a new collection and places it under the global `db` namespace. This allows for a natural `db.posts.find();` syntax. The new collection is placed in the both/lib/collections.js file.  
[See examples & details](http://foo)

**`mgen model <modelName>`**  
Creates a model facade around the collection insert/update/remove methods. While this isn't a model ORM like * , it allows you to abstract the db.foo calls and gives you a place to call methods for the data layer. We like the extra control Meteor methods give us so allow/deny is not used and security is handled in the method. This also allows model sharing via DDP.  
[See examples & details](http://foo)

**`mgen controller <controllerName>`**  
 Creates controllers for Iron-Router, adds routes, and creates pages for view controllers. If only `create`, `update`, or `destroy` actions are passed, no pages are created for these data only controllers.  
[See examples & details](http://foo)

**`mgen component <name>`**  
Re-useable widgets that are not tied to a page. These are typically things like the header, footer, weather widget, etc... Appends the Sass import into styles/_components.scss .  
[See examples & details](http://foo)

**`mgen page <name> <action>`**  
Create conceptual 'pages'. Creates it's own template, script, and stylesheet. No controllers are generated. If no action flag is passed in, all actions will be created. Possible actions: index, show, new, and edit.  
[See examples & details](http://foo)

**`mgen package <packageName>`**  
 Creates a Meteor smart package. Flags for client/server/both coming soon. Currently generates client/server/both files at once.

### Tests

Tests will soon be generated for models, controllers, and view templates with basic passing specs. Pass `--notests` at creation time to skip test output.

### Custom Templates / Config
Generators are only helpful if they save you time. Soon, you will be able to define your own templates folder so that you can include things like form helpers, test helpers... anything you want. A project level mgen config file will help team members sync settings and reduce command line flags.

