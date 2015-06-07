// page for creating a single __name-singular-pascal__ - /__name-plural-hyphen__/new/:id
__name-plural-pascal__Controller.New = AppController.extend({
  template: '__name-plural-camel__New',

  onBeforeAction: function() {
    console.log("  [__name-plural-pascal__Controller.New]: loading", this.url);
    this.next();
  }
});


