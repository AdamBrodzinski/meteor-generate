/*global templatePath */
var fs = require('fs-extra');

module.exports = {
  destRoot: 'both/',
  routeSrc: templatePath + 'router/routes.js',
  routeDest: 'both/routes.js',
  terminateRoute: '});//<end-routes>',

  // \}\);             - });
  // \/\/<end-routes>  - //<end-routes>
  beforeEndOfRouter: /\}\);\/\/<end-routes>/,


  // Public: Copy routes.js from templates folder into users `both/` folder.
  // If file already exists it will not be overwritten.
  //
  create: function() {
    // create both folder if it doesn't already exisit
    fs.mkdirsSync(this.destRoot);


    // bail if router already exists
    if (fs.existsSync(this.destRoot + 'routes.js')) return;

    // copy router.js from templates/ to project/both/controllers
    fs.copySync(this.routeSrc, this.routeDest);
    console.log('  Created both/routes.js');
  },

  // Public: Append the correct route into routes.js. The routes file is
  // examined for the `end-routes` marker and it is removed. The new route
  // is inserted onto the end of the file and the marker is re-appended.
  //
  // resName - The {String} name of the controller action, eg index, show
  //   
  appendRoute: function(resName, action) {
    var route, newContent, oldFileStr, newFileStr;

    // set correct route for the required action
    // TODO Pascal case namespaces, camelcase routes
    switch (action) {
      case 'index':
        route = "  this.route('" +resName+ "',     { path: '/"+resName+"',          controller: "+resName+".index });";
        break;
      case 'new':
        route = "  this.route('new" +resName+ "',  { path: '/"+resName+"/new',      controller: "+resName+".new });";
        break;
      case 'show':
        route = "  this.route('show" +resName+ "', { path: '/"+resName+"/:id',      controller: "+resName+".show });";
        break;
      case 'edit':
        route = "  this.route('edit" +resName+ "', { path: '/"+resName+"/edit/:id', controller: "+resName+".edit });";
        break;
      case 'comment_line':
        route = "  // " + resName + " routes";
        break;
      case 'blank_line':
        route = "";
        break;
      default:
        route = "  this.route('UNKNOWN', { path: '/', controller: UNKNOWN.index });";
        break;
    }

    // read routes.js from users folder and save to string
    // concat new route together
    oldFileStr = fs.readFileSync(this.routeDest, {encoding: 'utf-8'});
    newContent = route + "\n" + this.terminateRoute;

    // insert new content into current routes.js string
    // write new content to file `routes/controllers/resource_name.js`
    newFileStr = oldFileStr.replace(this.beforeEndOfRouter, newContent);
    fs.writeFileSync(this.routeDest, newFileStr);
  }
};
  
