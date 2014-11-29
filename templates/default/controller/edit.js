// show edit page for single __name-singular-pascal__ : /__name-plural-hyphen__/edit/:id
__name-plural-pascal__Controller.Edit = AppController.extend({
  template: '__name-plural-camel__Edit',

  waitOn: function() {
    //return Meteor.subscribe('__name-singular-camel__', this.params.id);
  },

  data: function() {
    //return db.__name-plural-camel__.findOne(this.params.id);
  },

  onBeforeAction: function() {
    console.log("  [__name-plural-pascal__Controller.Edit]: loading", this.url);
    this.next();
  }
});


