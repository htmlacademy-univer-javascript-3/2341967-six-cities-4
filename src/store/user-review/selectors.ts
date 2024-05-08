import { SlicesName } from '../../const/const';
import { State } from '../../types/state';

export const getCommentDataSendingStatus = (state: State): boolean => state[SlicesName.UserReview].isCommentDataSending;
