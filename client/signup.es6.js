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
    return promoCode.validTillString();
  },
  effectiveRate() {
    const currentRate = 6.0; // TODO: Propertly pass in the rate
    const promoCode = Template.instance().data.promoCode;
    return promoCode.effectiveRate(currentRate);
  }
});
