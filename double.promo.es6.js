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
    return {referral: PromoReferrers.findOne({promoCode: code})};
  },
  action() {
    this.render("main");
  },
  onAfterAction() {
    let instance = this;
    if (instance.ready() && Meteor.isClient) {
      let referral = instance.data().referral;
      console.log(`code: ${referral.promoCode}, referral: ${referral}`);
      SEO.set({
        og: {
          'description': referral.message
        }
      });
      console.log(`SEO: ${SeoCollection.findOne()}`);
    }
  }
});

Router.route('/success', {
  template : 'success'
});

Router.route('/terms', {
  template : 'terms'
});
