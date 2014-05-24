// page for a list of __name-plural-pascal__ - /__name-plural-hyphen__
__name-plural-pascal__Controller.index = AppController.extend({
  template: '__name-plural-camel__',

  waitOn: function() {
    return Meteor.subscribe('__name-plural-camel__');
  },

  data: function() {
    return __name-singular-pascal__.find();
  },

  onBeforeAction: function() {
    console.log('Loading __name-plural-camel__ template');
  }
});

 
