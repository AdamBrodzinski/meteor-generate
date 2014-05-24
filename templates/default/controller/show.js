// page for showing a single __name-singular-pascal__ - /__name-plural-hyphen__/:id
__name-plural-pascal__Controller.show = AppController.extend({
  template: 'show__name-singular-pascal__',

  waitOn: function() {
    return Meteor.subscribe('__name-singular-camel__', this.params.id);
  },

  data: function() {
    return __name-singular-pascal__.findOne(this.params.id);
  },

  onBeforeAction: function() {
    console.log('Loading show__name-singular-pascal__ template');
  }
});

 
