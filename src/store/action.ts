import {createAction} from '@reduxjs/toolkit';
import { Actions } from '../const/const';
import { Offer } from '../types/offer';

export const pickCity = createAction(Actions.PICK_CITY, (textContent: string | null) => ({
  payload: textContent,
}));

export const filterOffers = createAction(Actions.FILTER_OFFERS);

export const loadOffers = createAction<Offer[]>(Actions.LOAD_OFFERS);

export const setOffersDataLoading = createAction<boolean>(Actions.SET_STATUS_OFFERS_DATA_LOADING);

export const setOffersDataLoadingStatus = createAction<boolean>(
  'setOffersDataLoadingStatus'
);

export const setError = createAction<string | null>('game/setError');

export const changeCity = createAction<Offer>('changeCity');
