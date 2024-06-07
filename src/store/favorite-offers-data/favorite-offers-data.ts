import { createSlice } from '@reduxjs/toolkit';
import { FavoriteOffersData } from '../../types/state';
import { getFavoriteOffersAction } from '../api-action';
import { SlicesName } from '../../const/const';

const initialState: FavoriteOffersData = {
  isFavoriteOffersDataLoading: false,
  favoriteOffers: [],
};

export const favoriteOffersData = createSlice({
  name: SlicesName.FavoriteOffersData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFavoriteOffersAction.pending, (state) => {
        state.isFavoriteOffersDataLoading = true;
      })
      .addCase(getFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersDataLoading = false;
      });
  }
});
