LifeCycle = {
  createAndWelcomeCustomer (name, email, slack, code) {
    const self = this;
    const splitNames = name.split(' ');
    const firstname = splitNames[0];
    const lastname = splitNames.slice(-1)[0];

    // Should come from a plan with discount code in effect
    const starterPlan = Plans.starter;
    const effectivePlan = Plans.applyDiscount(starterPlan, code);

    const options = {
      email: email,
      password: Meteor.uuid(),
      profile: {
        firstname: firstname,
        lastname: lastname,
        slack: slack,
        hourlyRate: effectivePlan.minuteRate, // TODO hourlyRate is incorrectly labelled
        creditMs: effectivePlan.initialMinuteCredit
      }
    };
    try {
      const userId = D.Users.createCustomer(options);

      // TODO: to refactor later. All parameters are passed in explicitly to minimize coupling between email template user, subscription, and promo code models.
      const promoCode = PromoCodes.findOne({ code:code });
      self.welcomeNewCustomer(firstname, email, slack, code, promoCode && promoCode.minuteRateDiscountPercent, effectivePlan.minuteRate, moment(promoCode && promoCode.validTill).format("MMM Do, YYYY"));

      const text = `New customer sign up: *${name}*, email: ${email}, slack: ${slack || "N/A"}, code: ${code}`;
      Slack.notify('signup', text);
    }
    catch (error) {
      const errorText = `${error}, ${JSON.stringify(options)}`;
      Slack.notify('signup', errorText);
    }
  },

  // TODO: we should refactor and pass in userId instead
  // of explicitly passing everything.
  welcomeNewCustomer (firstName, emailAddress, slackURL, code, minuteRateDiscountPercent, effectiveMinuteRate, discountValidTill) {
    const email = EmailTemplates.welcome(firstName, emailAddress, slackURL, code, minuteRateDiscountPercent, effectiveMinuteRate, discountValidTill);
    console.log(JSON.stringify(email));
    Email.send(email);
  }
};
