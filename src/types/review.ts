export type User = {
  id: number;
  name: string;
  avatar: string;
  isPro: boolean;
};

export type ReviewType = {
  id: number;
  date: string;
  user: User;
  comment: string;
  rating: number;
}
