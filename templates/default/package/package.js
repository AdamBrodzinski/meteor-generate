Package.describe({
  summary: 'AmoduleBoilerplate'
});

Package.on_use(function (api) {
    //api.use('deps', 'client');

    api.add_files('client.js', 'client');
    api.add_files('server.js', 'server');
    api.add_files('both.js', ['client', 'server']);

    //api.export('MyPackage', 'client');
    //api.export('MyOtherName', 'server');
});

