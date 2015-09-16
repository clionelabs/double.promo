Promos = new Meteor.Collection('promos');

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
        from : 'promo@double.co',
        to : 'thomas@double.co',
        subject: `New Referral from ${referrer.profile.firstname}`,
        text: `${name} of ${website} has signed up with ${email}, YEAH!!!!`
      });
    });
  }
});

Meteor.publish('promoUser', function(promoCode) {
  return Meteor.users.find({ 'profile.promo.code' : promoCode });
});