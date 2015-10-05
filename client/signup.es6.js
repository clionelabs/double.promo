Template.signup.onRendered(function() {
  $("#signup").validate();
});

Template.signup.events({
  "submit #signup" : function(e, tmpl) {
    e.preventDefault();
    let name = e.target['full-name'].value;
    let email = e.target.email.value;
    let company = e.target['company-website'].value;
    // TODO: add promo code
    Meteor.call('signup', name, email, company, function() {
      Router.go('/success');
    });
  }
})
