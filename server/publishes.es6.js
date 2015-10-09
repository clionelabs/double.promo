Meteor.publish('referrals', function(code) {
  if (!code) return [];
  let crusor = PromoReferrals.find({promoCode: code});
  if (crusor.count()==0) return [];
  return [ crusor ];
});
