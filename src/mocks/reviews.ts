import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: 1,
    date: '2019-05-08T14:13:56.569Z',
    user: {
      id: 2,
      name: 'Max',
      avatar: '../../../markup/img/avatar-max.jpg',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },

  {
    id: 2,
    date: '2019-05-08T14:13:56.569Z',
    user: {
      id: 3,
      name: 'Alex',
      avatar: '../../../markup/img/avatar-max.jpg',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },

  {
    id: 3,
    date: '2019-05-08T14:13:56.569Z',
    user: {
      id: 2,
      name: 'Max',
      avatar: '../../../markup/img/avatar-max.jpg',
      isPro: true
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 3.2
  },

  {
    id: 4,
    date: '2019-05-08T14:13:56.569Z',
    user: {
      id: 2,
      name: 'Max',
      avatar: '../../../markup/img/avatar-max.jpg',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4.9
  },
];
