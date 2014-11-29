// page for showing a single __name-singular-pascal__ - /__name-plural-hyphen__/:id
__name-plural-pascal__Controller.Show = AppController.extend({
  template: '__name-plural-camel__Show',

  waitOn: function() {
    //return Meteor.subscribe('__name-singular-camel__', this.params.id);
  },

  data: function() {
    //return db.__name-plural-camel__.findOne(this.params.id);
  },

  onBeforeAction: function() {
    console.log("  [__name-plural-pascal__Controller.Show]: loading", this.url);
    this.next();
  }
});


