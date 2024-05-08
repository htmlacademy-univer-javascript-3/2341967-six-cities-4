import { SlicesName } from '../../const/const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): string => state[SlicesName.User].authorizationStatus;
export const getUserEmail = (state: State): string => state[SlicesName.User].userEmail;
