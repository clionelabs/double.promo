Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/r/:code', {
  onBeforeAction() {
    let promoReferrer = PromoReferrers.findOne();
    if (!promoReferrer) {
      window.location = 'http://double.co';
    } else {
      this.next();
    }
  },
  waitOn() {
    let instance = this;
    return [
      Meteor.subscribe('promoUser', instance.params.code)
    ];
  },
  data() {
    let instance = this;
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
