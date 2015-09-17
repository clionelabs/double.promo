Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  template : 'main',
  waitOn() {
    let instance = this;
    return [
      Meteor.subscribe('promoUser', instance.params.query.code)
    ];
  },
  data() {
    let instance = this;
    return { promoCode : instance.params.query.code }
  }
});
Router.route('/success', {
  template : 'success'
});
