import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const/const';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { filterOffers, loadOffers, setOffersDataLoading, setError} from './action';
import {store} from './';

export const clearErrorAction = createAsyncThunk(
  'game/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);


export const getOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoading(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoading(false));
    dispatch(loadOffers(data));
    dispatch(filterOffers());
  },
);
