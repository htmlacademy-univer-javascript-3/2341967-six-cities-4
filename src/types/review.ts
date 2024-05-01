import { User } from './offer';

export type ReviewType = {
  id: number;
  date: string;
  user: User;
  comment: string;
  rating: number;
}
