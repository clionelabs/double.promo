Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  template : 'main',
  data() {
    let instance = this;
    return { promoCode : instance.params.query.promoCode }
  }
});
Router.route('/success', {
  template : 'success'
});
