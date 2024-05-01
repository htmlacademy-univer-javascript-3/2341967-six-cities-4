import {createReducer} from '@reduxjs/toolkit';
import { CitiesName, AuthorizationStatus } from '../const/const';
import { startStateType } from '../types/start-state';
import { filterOffers, loadNearbyOffers, loadOfferComments, loadOfferInfo, loadOffers, pickCity, requireAuthorization,
  setCommentDataSending, setCurrentOfferDataLoading, setError, setOffersDataLoading, setUserEmail } from './action';

const initialState: startStateType = {
  offers: [],
  cityName: CitiesName.PARIS,
  filteredOffers: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  error: null,
  currentOffer: {
    offerInfo: null,
    comments: [],
    nearbyOffers: [],
    isCommentDataSending: false,
  },
  isCurrentOfferDataLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(pickCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(filterOffers, (state) => {
      state.filteredOffers = state.offers.filter((offer)=> offer.city.name === state.cityName);
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoading, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(loadOfferInfo, (state, action) => {
      state.currentOffer.offerInfo = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.currentOffer.nearbyOffers = action.payload;
    })
    .addCase(loadOfferComments, (state, action) => {
      state.currentOffer.comments = action.payload;
    })
    .addCase(setCurrentOfferDataLoading, (state, action) => {
      state.isCurrentOfferDataLoading = action.payload;
    })
    .addCase(setCommentDataSending, (state, action) => {
      state.currentOffer.isCommentDataSending = action.payload;
    });
});
