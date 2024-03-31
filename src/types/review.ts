export type User = {
  id: string;
  name: string;
  avatar: string;
  isPro: boolean;
};

export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}
