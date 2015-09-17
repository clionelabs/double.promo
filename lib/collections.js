/**
 * @property {String} referrerId UserId
 * @property {String} promoCode
 * @property {String} message
 * @property {String} profilePicUrl
 */
PromoReferrers = new Meteor.Collection('promo-referrers');

/**
 * @property {String} name Full name of referee
 * @property {String} email Email of referee
 * @property {String} website
 * @property {String} referrerId UserId of referrer
 */
Promos = new Meteor.Collection('promo-registrations');
