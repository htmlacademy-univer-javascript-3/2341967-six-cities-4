import { createAction } from '@reduxjs/toolkit';
import { Actions, AppRoute, AuthorizationStatus } from '../const/const';

export const redirectToRoute = createAction<AppRoute>(Actions.REDIRECT_ROUTE);

export const requireAuthorization = createAction<AuthorizationStatus>(Actions.REQUIRE_AUTHORIZATION);

export const setError = createAction<string | null>(Actions.SET_ERROR);
