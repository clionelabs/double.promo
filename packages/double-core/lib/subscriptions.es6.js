D.Subscriptions = new Meteor.Collection('subscriptions');

D.Subscriptions.addDefaultForNewUser = (userId, cb) => {
  const plan = D.Plans.findDefault();
  D.Subscriptions.insert({
    planId : plan._id,
    customerId : userId,
    startedAt : moment().valueOf()
  }, cb);
};

