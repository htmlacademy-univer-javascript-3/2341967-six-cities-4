import { SortingTypes } from '../../const/const';
import { Offer } from '../../types/offer';
import { compareOffersPriceDown, compareOffersPriceUp, compareOffersRatingDown } from '../../const/utils';

export function useSorting(offers: Offer[], sortingType: string | null) {
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
