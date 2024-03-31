export type User = {
  id: number;
  name: string;
  avatar: string;
  isPro: boolean;
};

export type Review = {
  id: number;
  date: string;
  user: User;
  comment: string;
  rating: number;
}
