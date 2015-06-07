Template.applicationsNew.rendered = function() {
  var container = document.getElementById('Comp_Container');
  React.render(React.createElement(AppForm), container);
};

Template.applicationsNew.destroyed = function() {
  var container = document.getElementById('Comp_Container');
  React.unmountComponentAtNode(container);
};

