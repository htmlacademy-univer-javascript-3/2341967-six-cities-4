export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  isPro: boolean;
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  bedrooms: number;
  maxAdults: number;
  amenities: string[];
  host: User;
  city: City;
  location: Location;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  images: string[];
  rating: number;
};
