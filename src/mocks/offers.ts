import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    id: 1,
    title: 'Beautiful & luxurious studio at great location',
    description: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. Where the bustle of the city comes to rest in this alley flowery and colorful.',
    type: 'apartment',
    price: 70,
    bedrooms: 1,
    maxAdults: 2,
    amenities: ['Wi-Fi', 'Heating', 'Kitchen', 'Fridge', 'Washing machine'],
    host: {
      id: 1,
      name: 'Angelina',
      avatar: '../../../markup/img/avatar-angelina.jpg',
      isPro: true
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: false,
    rating: 2,
    previewImage: '../../../markup/img/room.jpg',
    images: ['../../../markup/img/room.jpg', '../../../markup/img/apartment-01.jpg', '../../../markup/img/apartment-02.jpg',
      '../../../markup/img/apartment-03.jpg', '../../../markup/img/studio-01.jpg'],
  },

  {
    id: 2,
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    description: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. Where the bustle of the city comes to rest in this alley flowery and colorful.',
    price: 90,
    bedrooms: 2,
    maxAdults: 4,
    amenities: ['Wi-Fi', 'Heating', 'Kitchen', 'Fridge', 'Washing machine',
      'Coffee machine', 'Dishwasher', 'Towels', 'Baby seat', 'Cabel TV'],
    host: {
      id: 1,
      name: 'Angelina',
      avatar: '../../../markup/img/avatar-angelina.jpg',
      isPro: true
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.1,
    previewImage: '../../../markup/img/room.jpg',
    images: ['../../../markup/img/room.jpg', '../../../markup/img/apartment-01.jpg', '../../../markup/img/apartment-02.jpg',
      '../../../markup/img/apartment-03.jpg', '../../../markup/img/studio-01.jpg'],
  },

  {
    id: 3,
    title: 'Beautiful & luxurious studio at great location',
    description: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. Where the bustle of the city comes to rest in this alley flowery and colorful.',
    type: 'apartment',
    price: 100,
    bedrooms: 2,
    maxAdults: 3,
    amenities: ['Wi-Fi', 'Heating', 'Kitchen', 'Fridge', 'Washing machine',
      'Coffee machine', 'Towels', 'Cabel TV'],
    host: {
      id: 1,
      name: 'Angelina',
      avatar: '../../../markup/img/avatar-angelina.jpg',
      isPro: true
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    previewImage: '../../../markup/img/room.jpg',
    images: ['../../../markup/img/room.jpg', '../../../markup/img/apartment-01.jpg', '../../../markup/img/apartment-02.jpg',
      '../../../markup/img/apartment-03.jpg', '../../../markup/img/studio-01.jpg'],
  },

  {
    id: 4,
    title: 'Beautiful & luxurious studio at great location',
    description: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. Where the bustle of the city comes to rest in this alley flowery and colorful.',
    type: 'apartment',
    price: 150,
    bedrooms: 2,
    maxAdults: 4,
    amenities: ['Wi-Fi', 'Heating', 'Kitchen', 'Fridge', 'Washing machine',
      'Dishwasher', 'Towels', 'Baby seat', 'Cabel TV'],
    host: {
      id: 1,
      name: 'Angelina',
      avatar: '../../../markup/img/avatar-angelina.jpg',
      isPro: true
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
    previewImage: '../../../markup/img/room.jpg',
    images: ['../../../markup/img/room.jpg', '../../../markup/img/apartment-01.jpg', '../../../markup/img/apartment-02.jpg',
      '../../../markup/img/apartment-03.jpg', '../../../markup/img/studio-01.jpg'],
  },
];
