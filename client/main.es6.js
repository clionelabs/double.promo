Template.main.onCreated(function() {
  let instance = this;
  instance.autorun(function() {
    let subscription = instance.subscribe('promoUser', instance.data.promoCode);
  });

  instance.promoReferrer = function() { return PromoReferrers.findOne() };
  instance.user = function() { return Meteor.users.findOne() };
});
Template.main.helpers({
  firstName() {
    let user = Template.instance().user();
    if (!user) return;
    return user.profile.firstname;
  },
  userProfilePicUrl() {
    let user = Template.instance().user();
    if (!user) return;
    return `/${user._id}.jpg`;
  },
  testimonial() {
    return Template.instance().promoReferrer().message;
  },
  displayName() {
    let user = Template.instance().user();
    if (!user) return;
    let fname = Template.instance().user().profile.firstname;
    let lname = Template.instance().user().profile.lastname;
    return `${fname} ${lname}`;
  }
});
Template.main.events({
  "submit #signup" : function(e, tmpl) {
    e.preventDefault();
    let name = e.target['full-name'].value;
    let email = e.target.email.value;
    let company = e.target['company-website'].value;
    Meteor.call('register', name, email, company, tmpl.user()._id, function() {
      Router.go('/success');
    })
  }
})
