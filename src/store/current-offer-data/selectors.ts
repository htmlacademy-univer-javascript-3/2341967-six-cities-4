import { SlicesName } from '../../const/const';
import { State } from '../../types/state';
import { Offer } from '../../types/offer';
import { ReviewType } from '../../types/review';

export const getCurrentOfferDataLoadingStatus = (state: State): boolean => state[SlicesName.CurrentOfferData].isCurrentOfferDataLoading;
export const getOfferInfo = (state: State): Offer | null => state[SlicesName.CurrentOfferData].offerInfo;
export const getComments = (state: State): ReviewType[] => state[SlicesName.CurrentOfferData].comments;
export const getNearbyOffers = (state: State): Offer[] => state[SlicesName.CurrentOfferData].nearbyOffers;
