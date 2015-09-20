Template.main.onCreated(function() {
  let instance = this;
  instance.referral = function() { return PromoReferrals.findOne(); };
  instance.referrer = function() { return PromoReferrals.findOne().referrer; };
});

Template.main.onRendered(function() {
  $("#signup").validate();
});

// TODO do we need template helpers to access these properties?
Template.main.helpers({
  userProfilePicUrl() {
    return Template.instance().referrer().profilePicUrl;
  },
  testimonial() {
    return Template.instance().referral().message;
  },
  firstName() {
    return Template.instance().referrer().firstName;
  },
  displayName() {
    let fname = Template.instance().referrer().firstName;
    let lname = Template.instance().referrer().lastName;
    return `${fname} ${lname}`;
  }
});
Template.main.events({
  "submit #signup" : function(e, tmpl) {
    e.preventDefault();
    let name = e.target['full-name'].value;
    let email = e.target.email.value;
    let company = e.target['company-website'].value;
    let referrerName = tmpl.referrer().firstName;
    let referrerUserId = tmpl.referrer().userId;
    Meteor.call('register', name, email, company, referrerName, referrerUserId, function() {
      Router.go('/success');
    });
  }
})
