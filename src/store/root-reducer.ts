import { combineReducers } from '@reduxjs/toolkit';
import { SlicesName } from '../const/const';
import { authorizationUserProcess } from './authorization-user-process/authorization-user-process';
import { currentOfferData } from './current-offer-data/current-offer-data';
import { userReview } from './user-review/user-review';
import { offersData } from './offers-data/offers-data';
import { pageEvents } from './page-events/page-events';

export const rootReducer = combineReducers({
  [SlicesName.User]: authorizationUserProcess.reducer,
  [SlicesName.Page]: pageEvents.reducer,
  [SlicesName.OffersData]: offersData.reducer,
  [SlicesName.CurrentOfferData]: currentOfferData.reducer,
  [SlicesName.UserReview]: userReview.reducer,
});
