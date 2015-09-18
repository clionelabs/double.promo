
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
      Email.send({
        from : 'promo@askdouble.com',
        to : 'thomas@double.co',
        subject: `New Referral from ${referrer.profile.firstname} (${count} th)`,
        text: `${name} of ${website} has signed up with ${email}, YEAH!!!!`
      });
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
