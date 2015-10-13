Meteor.methods({
  signup(name, email, slack, code) {
    this.unblock();
    LifeCycle.createAndWelcomeCustomer(name, email, slack, code);
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
