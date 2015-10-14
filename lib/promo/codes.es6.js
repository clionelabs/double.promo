PromoCode = {};

PromoCode.Prototype = {
  validTillString() {
    return moment(this.validTill).format('MMM Do, YYYY');
  },
  effectiveRate(originalRate) {
    return originalRate * (100-this.minuteRateDiscountPercent) / 100.0;
  }
};

PromoCode.transform = (doc) => {
  return _.extend(doc, PromoCode.Prototype);
};

/**
 * @property {String} code
 * @property {Number} minuteRateDiscountPercent
 * @property {Number} additionalMinuteCredit
 * @property {Date} validTill
 */
PromoCodes = new Meteor.Collection('promo-codes',{
  transform: PromoCode.transform
});
