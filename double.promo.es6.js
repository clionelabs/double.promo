Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  template : 'main',
  data() {
    let instance = this;
    return { promoCode : instance.params.query.code }
  }
});
Router.route('/success', {
  template : 'success'
});
