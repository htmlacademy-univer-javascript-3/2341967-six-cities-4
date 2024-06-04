import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, SlicesName } from '../../const/const';
import { AuthorizationUserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';

const initialState: AuthorizationUserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

export const authorizationUserProcess = createSlice({
  name: SlicesName.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
