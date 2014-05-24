// show edit page for single __name-singular-pascal__ : /__name-plural-hyphen__/edit/:id
__name-plural-pascal__Controller.edit = AppController.extend({
  template: 'edit__name-singular-pascal__',

  waitOn: function() {
    return Meteor.subscribe('__name-singular-camel__', this.params.id);
  },

  data: function() {
    return __name-singular-pascal__.findOne(this.params.id);
  },

  onBeforeAction: function() {
    console.log('Loading __name-singular-camel__ template');
  }
});

 
