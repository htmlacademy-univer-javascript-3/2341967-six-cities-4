import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OffersData } from '../../types/state';
import { getOffersAction, setOfferFavoriteStatusAction } from '../api-action';
import { SlicesName, CitiesName } from '../../const/const';

const initialState: OffersData = {
  isOffersDataLoading: false,
  offers: [],
  filteredOffers: [],
  cityName: CitiesName.PARIS,
};

export const offersData = createSlice({
  name: SlicesName.OffersData,
  initialState,
  reducers: {
    filterOffers: (state) => {
      state.filteredOffers = state.offers.filter((offer)=> offer.city.name === state.cityName);
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(getOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
        state.filteredOffers = state.offers.filter((offer)=> offer.city.name === state.cityName);
      })
      .addCase(setOfferFavoriteStatusAction.fulfilled, (state, action) => {
        const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
        state.offers = [
          ...state.offers.slice(0, index),
          action.payload,
          ...state.offers.slice(index + 1),
        ];
        state.filteredOffers = state.offers.filter((offer)=> offer.city.name === state.cityName);
      });
  },
});

export const {filterOffers, setCity} = offersData.actions;
