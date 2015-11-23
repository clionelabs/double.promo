D.Plans = new Meteor.Collection('plans');

D.Plans.findDefault = () => {
  return D.Plans.findOne({ isDefault : true });
};


