import { Offer } from './offer';

export type startStateType = {
    cityName: string | null;
    offers: Offer[];
    filteredOffers: Offer[];
    isOffersDataLoading: boolean;
    error: string | null;
  }
