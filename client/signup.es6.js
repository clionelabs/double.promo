Template.signup.onRendered(function() {
  $("#signup").validate();
});

Template.signup.events({
  "submit #signup" : function(e, tmpl) {
    e.preventDefault();
    let name = e.target['full-name'].value;
    let email = e.target.email.value;
    let slack = e.target['slack'].value;
    // TODO: add promo code
    Meteor.call('signup', name, email, slack, function() {
      Router.go('/success');
    });
  }
})
