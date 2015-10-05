
Meteor.methods({
  signup(name, email, slack) {
    this.unblock();
    let hook = "https://hooks.slack.com/services/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";
    let payload = { 'text': `*${name}* (email: ${email}, slack: ${slack || "N/A"}) signed up.` };
    payload = {'payload': JSON.stringify(payload)};
    HTTP.post(hook, {'params': payload});
  },
  register(name, email, company, referrerName, referrerUserId) {
    this.unblock();
    PromoRegistrations.insert({
      name : name,
      email : email,
      website : website,
      referrerId : referrerUserId
    }, function() {
      let count = PromoRegistrations.find({referrerId:referrerUserId}).count();
      let hook = "https://hooks.slack.com/services/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";
      let payload = { 'text': `${referrerName} referred *${name}* (${email}) from ${company || "N/A"}. ${count} th referrals!` };
      payload = {'payload': JSON.stringify(payload)};
      HTTP.post(hook, {'params': payload});
    });
  }
});

Meteor.publish('referrals', function(code) {
  if (!code) return [];
  let crusor = PromoReferrals.find({promoCode: code});
  if (crusor.count()==0) return [];
  return [ crusor ];
});
