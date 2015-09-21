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
    let code = instance.params.code;
    return {referral: PromoReferrals.findOne({promoCode: code})};
  },
  action() {
    this.render("main");
  },
  onAfterAction() {
    let instance = this;
    if (instance.ready() && Meteor.isClient) {
      let referral = instance.data().referral;
      SEO.set({
        og: {
          'image': referral.imageUrl,
          'description': referral.message
        }
      });
    }
  }
});

Router.route('/success', {
  template : 'success'
});

Router.route('/terms', {
  template : 'terms'
});

Router.route('/(.*)', () => {
  window.location = 'http://double.co';
});
