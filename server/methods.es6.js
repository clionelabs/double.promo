Meteor.methods({
  signup(name, email, slack) {
    this.unblock();

    const splitNames = name.split(' ');
    const firstname = splitNames[0];
    const lastname = splitNames.slice(-1)[0];

    // Should come from a plan with discount code in effect
    const effectiveMinuteRate = 6.0;
    const minuteCredit = 30;

    const userId = D.Users.createCustomer({
      email: email,
      password: Meteor.uuid(),
      profile: {
        firstname: firstname,
        lastname: lastname,
        slack: slack,
        hourlyRate: effectiveMinuteRate, // TODO hourlyRate is incorrectly labelled
        creditMs: minuteCredit
      }
    });

    if (userId) {
      // TODO: Send onboarding email
      const text = `New customer sign up: *${name}*, email: ${email}, slack: ${slack || "N/A"}`;
      Slack.notify('signup', text);
    } else {
      const error = `Cannot create account with name: ${name}, email: ${email}, slack: ${slack || "N/A"}`;
      Slack.notify('signup', error);
    }
  },
  register(name, email, website, referrerName, referrerUserId) {
    this.unblock();
    PromoRegistrations.insert({
      name : name,
      email : email,
      website : website,
      referrerId : referrerUserId
    }, function() {
      let count = PromoRegistrations.find({referrerId:referrerUserId}).count();
      let hook = "https://hooks.slack.com/services/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";
      let payload = { 'text': `${referrerName} referred *${name}* (${email}) from ${website || "N/A"}. ${count} th referrals!` };
      payload = {'payload': JSON.stringify(payload)};
      HTTP.post(hook, {'params': payload});
    });
  }
});
