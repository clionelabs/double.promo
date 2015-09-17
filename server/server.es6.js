
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
      Email.send({
        from : 'promo@askdouble.com',
        to : 'thomas@double.co',
        subject: `New Referral from ${referrer.profile.firstname}`,
        text: `${name} of ${website} has signed up with ${email}, YEAH!!!!`
      });
    });
  }
});

Meteor.publish('promoUser', function(promoCode) {
  if (!promoCode) return;
  let promoReferrer = PromoReferrers.findOne({promoCode: promoCode});
  return [
    PromoReferrers.find({ promoCode: promoCode}),
    Meteor.users.find({ _id: promoReferrer.referrerId})
  ]
});
