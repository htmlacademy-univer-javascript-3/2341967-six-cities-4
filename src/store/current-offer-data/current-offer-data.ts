import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentOfferData } from '../../types/state';
import { getOfferInfoAction, sendOfferCommentAction } from '../api-action';
import { SlicesName } from '../../const/const';
import { Offer } from '../../types/offer';
import { ReviewType } from '../../types/review';

const initialState: CurrentOfferData = {
  isCurrentOfferDataLoading: false,
  offerInfo: null,
  comments: [],
  nearbyOffers:[],
};

export const currentOfferData = createSlice({
  name: SlicesName.CurrentOfferData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOfferInfoAction.pending, (state) => {
        state.isCurrentOfferDataLoading = true;
      })
      .addCase(getOfferInfoAction.fulfilled, (
        state,
        action: PayloadAction<{offerData: Offer; nearbyOffersData: Offer[]; commentsData: ReviewType[]}>) => {
        const {offerData, nearbyOffersData, commentsData} = action.payload;
        state.offerInfo = offerData;
        state.comments = commentsData;
        state.nearbyOffers = nearbyOffersData;
        state.isCurrentOfferDataLoading = false;
      })
      .addCase(getOfferInfoAction.rejected, (state) => {
        state.isCurrentOfferDataLoading = false;
      })
      .addCase(sendOfferCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});
