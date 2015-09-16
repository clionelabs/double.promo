if (Meteor.isClient) {
  Template.main.helpers({
    firstName() {
      return 'Casey';
    },
    userProfilePicUrl() {
      let hash = CryptoJS.MD5('gilbert.wat@getthingsdone.hk');
      return `http://0.gravatar.com/avatar/${hash}.png`;
    },
    testimonial() {
      return 'Double just works. Get yours and you’ll find yourself doing more than you’re able to do by yourself and keep the time you saved working on more important things you can’t delegate.';
    },
    displayName() {
      return 'Casey Lau';
    }
  });
}

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  template : 'main'
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
