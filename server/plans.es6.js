/**
 * @property {Number} minuteRate
 * @property {Number} initialMinuteCredit
 */
// Plans = new Meteor.Collection('plans');
Plans = {
  starter: {
    minuteRate: 6.0,
    initialMinuteCredit: 30.0,
  },

  applyDiscount (plan, code) {
    return {
      minuteRate: plan.minuteRate * (100-code.minuteRateDiscountPercent)/100,
      initialMinuteCredit: plan.initialMinuteCredit + additionalMinuteCredit
    };
  }
}
