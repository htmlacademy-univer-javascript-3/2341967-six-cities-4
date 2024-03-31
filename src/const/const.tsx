export enum AppRoute {
  Favorites = '/favorites',
  Root = '/',
  Login = '/login',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}


export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export enum AdClasses {
    ArticlePropertyAdClass = 'near-places__card place-card',
    ArticleMainAdClass = 'cities__card place-card',
    ImageWrapperPropertyAdClass = 'near-places__image-wrapper place-card__image-wrapper',
    ImageWrapperMainAdClass = 'cities__image-wrapper place-card__image-wrapper',
  }

export enum MapClasses {
    SectionMainMapClass = 'cities__map map',
    SectionPropertyMapClass = 'offer__map map',
  }
