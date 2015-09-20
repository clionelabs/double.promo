Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/r/:code', {
  onBeforeAction() {
    let referral = PromoReferrals.findOne();
    if (!referral) {
      window.location = 'http://double.co';
    } else {
      this.next();
    }
  },
  waitOn() {
    let instance = this;
    return [
      Meteor.subscribe('referrals', instance.params.code)
    ];
  },
  data() {
    let instance = this;
    // TODO: what do we need this for?
    return { promoCode : instance.params.code }
  },
  action() {
    this.render("main");
  }
});

Router.route('/success', {
  template : 'success'
});

Router.route('/terms', {
  template : 'terms'
});
