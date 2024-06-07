import { Offer } from '../types/offer';
import { SortingTypes } from './const';
import dayjs from 'dayjs';

const RELEASE_DATE_FORMAT = 'MMMM YYYY';

export function getStars(rating: number): string {
  return `${20 * rating}%`;
}

export function conversionDate(date: string): string {
  return date ? dayjs(date).format(RELEASE_DATE_FORMAT) : '';
}

export function compareOffersPriceUp(offerA: Offer, offerB: Offer) {
  return offerA.price - offerB.price;
}

export function compareOffersPriceDown(offerA: Offer, offerB: Offer) {
  return offerB.price - offerA.price;
}

export function compareOffersRatingDown(offerA: Offer, offerB: Offer) {
  return offerB.rating - offerA.rating;
}

export function validatePassword(password: string): boolean {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasLetter && hasNumber;
}

export function sortOffers(offers: Offer[], sortingType: string | null) {
  const sortedOffers = [...offers];
  switch(sortingType) {
    case SortingTypes.LowToHigh:
      return sortedOffers.sort(compareOffersPriceUp);
    case SortingTypes.HighToLow:
      return sortedOffers.sort(compareOffersPriceDown);
    case SortingTypes.TopRated:
      return sortedOffers.sort(compareOffersRatingDown);
    default:
      return sortedOffers;
  }
}
