Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
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
      Meteor.subscribe('promoUser', instance.params.query.code)
    ];
  },
  data() {
    let instance = this;
    return { promoCode : instance.params.query.code }
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
