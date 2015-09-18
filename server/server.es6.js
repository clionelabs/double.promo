
Meteor.methods({
  register(name, email, website, referrerId) {
    this.unblock();
    let referrer = Meteor.users.findOne(referrerId);
    Promos.insert({
      name : name,
      email : email,
      website : website,
      referrerId : referrerId
    }, function() {
      let count = Promos.find({referrerId:referrerId}).count();
      let hook = "https://hooks.slack.com/services/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";
      let payload = { 'text': `${referrer.profile.firstname} referred ${name} (${email}) from ${website || "N/A"}. ${count} th referrals!` };
      payload = {'payload': JSON.stringify(payload)};
      HTTP.post(hook, {'params': payload});
    });
  }
});

Meteor.publish('promoUser', function(promoCode) {
  if (!promoCode) return [];
  let promoReferrer = PromoReferrers.findOne({promoCode: promoCode});
  if (!promoReferrer) return [];
  return [
    PromoReferrers.find({ promoCode: promoCode}),
    Meteor.users.find({ _id: promoReferrer.referrerId})
  ]
});
