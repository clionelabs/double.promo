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
    if (!code) {
      return plan;
    }

    const promoCode = PromoCodes.findOne({code: code});
    return {
      minuteRate: plan.minuteRate * (100-promoCode.minuteRateDiscountPercent)/100,
      initialMinuteCredit: plan.initialMinuteCredit + promoCode.additionalMinuteCredit
    };
  }
}
