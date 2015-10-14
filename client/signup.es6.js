Template.signup.onRendered(function() {
  $("#signup").validate();
});

Template.signup.events({
  "submit #signup" : function(e, tmpl) {
    e.preventDefault();
    const name = e.target['full-name'].value;
    const email = e.target['email'].value;
    const slack = e.target['slack'].value;
    const code = e.target['discount-code'].value;

    Meteor.call('signup', name, email, slack, code, function() {
      Router.go('/success');
    });
  }
});

Template.signup.helpers({

  discountCode() {
    const promoCode = Template.instance().data && Template.instance().data.promoCode;
    return promoCode && promoCode.code;
  },
  minuteRateDiscountPercent() {
    const promoCode = Template.instance().data.promoCode;
    return promoCode.minuteRateDiscountPercent;
  },
  minuteCredit() {
    const promoCode = Template.instance().data.promoCode;
    return promoCode.additionalMinuteCredit;
  },
  validTillString() {
    const promoCode = Template.instance().data.promoCode;
    return moment(promoCode.validTill).format('MMM Do, YYYY');
  },
  effectiveRate() {
    const promoCode = Template.instance().data.promoCode;
    return 6.0 * (100-promoCode.minuteRateDiscountPercent) / 100.0;
  }
});
