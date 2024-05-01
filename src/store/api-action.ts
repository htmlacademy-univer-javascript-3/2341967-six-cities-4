import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const/const';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { CommentData } from '../types/comment-data';
import { ReviewType } from '../types/review';
import { filterOffers, loadNearbyOffers, loadOfferComments, loadOfferInfo, loadOffers, redirectToRoute, requireAuthorization,
  setCommentDataSending, setCurrentOfferDataLoading, setError, setOffersDataLoading, setUserEmail, addReview } from './action';
import { store } from './';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';


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

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
    dispatch(setUserEmail(data.email));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserEmail(''));
  },
);

export const offerInfoInitAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerInfoInit',
  async(id, {dispatch, extra: api}) => {
    dispatch(setCurrentOfferDataLoading(true));
    const {data: offerData} = await api.get<Offer>(APIRoute.Offers + id);
    const {data: nearbyOffersData} = await api.get<Offer[]>(APIRoute.Offers + id + APIRoute.NearbyOffers);
    const {data: commentsData} = await api.get<ReviewType[]>(APIRoute.Comment + id);
    dispatch(setCurrentOfferDataLoading(false));
    dispatch(loadOfferInfo(offerData));
    dispatch(loadNearbyOffers(nearbyOffersData));
    dispatch(loadOfferComments(commentsData));
  },
);

export const sendOfferCommentAction = createAsyncThunk<void, {
  id: string;
  commentData: CommentData;
  resetFormData: () => void;
    },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'sendOfferComment',
    async({id, resetFormData, commentData}, {dispatch, extra: api}) => {
      try{
        dispatch(setCommentDataSending(true));
        const {data} = await api.post<ReviewType>(APIRoute.Comment + id, commentData);
        dispatch(setCommentDataSending(false));
        resetFormData();
        dispatch(addReview(data));
      } catch {
        dispatch(setCommentDataSending(false));
      }
    });
