// See Meteor docs for API use - https://docs.meteor.com/#/full/packagejs

Package.describe({
  // Short two-sentence summary.
  summary: "What your app does"

  // Version number.
  version: "1.0.0",

  // Optional. Default is package directory name.
  name: "username:package-name",

  // Optional github URL to your source repository.
  git: "https://github.com/something/something.git",
});


Package.onUse(function (api) {
  // If no version is specified for an 'api.use' dependency, use the one defined in Meteor 0.9.0.
  api.versionsFrom('0.9.0');

  // Use Underscore package, but only on the server.
  // Version not specified, so it will be as of Meteor 0.9.0.
  //api.use('underscore', 'server');

  // Use application-configuration package, version 1.0.0 or newer.
  //api.use('accounts@1.0.0');

  // Give users of this package access to the Templating package.
  //api.imply('templating')

  // Specify the source code for the package.
  api.add_files('client.js', 'client');
  api.add_files('server.js', 'server');
  api.add_files('both.js', ['client', 'server']);

  // Export the variable 'MyGlobal' in the server (use 'client' for browser)
  api.export('MyGlobal', 'server');
});

