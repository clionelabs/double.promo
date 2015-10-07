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
    this.render("referral");
  },
  onAfterAction() {
    let instance = this;
    if (instance.ready() && Meteor.isClient) {
      let referral = instance.data().referral;
      // TODO: Supposedly setting the meta tag will automatically set both
      // Twitter and Facebook. I only see `description` being in effect
      // https://github.com/DerMambo/ms-seo#automatically-set-twitter-and-og-meta-tags-like-title
      SEO.set({
        meta: {
          'description': referral.message
        },
        og: {
          image: referral.imageUrl
        },
        twitter: {
          image: referral.imageUrl
        }
      });
    }
  }
});

Router.route('/signup', {
  template : 'signup'
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