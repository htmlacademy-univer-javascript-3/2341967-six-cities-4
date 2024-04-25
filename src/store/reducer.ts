import {createReducer} from '@reduxjs/toolkit';
import { CitiesName } from '../const/const';
import { startStateType } from '../types/start-state';
import { filterOffers, loadOffers, pickCity, setOffersDataLoading, setError } from './action';

const initialState: startStateType = {
  offers: [],
  cityName: CitiesName.PARIS,
  filteredOffers: [],
  isOffersDataLoading: false,
  error: null,
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
