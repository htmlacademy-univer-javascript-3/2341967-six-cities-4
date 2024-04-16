import {createReducer} from '@reduxjs/toolkit';
import { CitiesName } from '../const/const';
import { offers } from '../mocks/offers';
import { initialStateType } from '../types/start-state';
import { filterOffers, pickCity } from './action';

const START_CITY_NAME = 'Paris';

const initialState: initialStateType = {
  cityName: CitiesName.PARIS,
  offers: offers.filter((offer) => offer.city.name === START_CITY_NAME),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(pickCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(filterOffers, (state) => {
      state.offers = offers.filter((offer)=> offer.city.name === state.cityName);
    });
});
