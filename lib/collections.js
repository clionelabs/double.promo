/**
 * @property {String} promoCode
 * @property {String} message
 * @property {String} imageUrl
 * @property {hash} referrer = { userId:, firstName:, lastName:, profilePicUrl:}
 */
PromoReferrals = new Meteor.Collection('promo-referrals');

/**
 * @property {String} name Full name of referee
 * @property {String} email Email of referee
 * @property {String} website
 * @property {String} referrerId UserId of referrer
 */
PromoRegistrations = new Meteor.Collection('promo-registrations');
