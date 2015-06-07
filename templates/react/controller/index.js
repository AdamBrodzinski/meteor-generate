// page for a list of __name-plural-pascal__ - /__name-plural-hyphen__
__name-plural-pascal__Controller.Index = AppController.extend({
  template: '__name-plural-camel__',

  subscriptions: function() {
    //this.subscribe('__name-plural-camel__');
  },

  data: function() {
    //return db.__name-plural-camel__.find();
  },

  onBeforeAction: function() {
    console.log("  [__name-plural-pascal__Controller.Index]: loading", this.url);
    this.next();
  }
});


