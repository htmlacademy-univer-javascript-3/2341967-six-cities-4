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
export enum CitiesName {
    AMSTERDAM = 'Amsterdam',
    COLOGNE = 'Cologne',
    PARIS = 'Paris',
    DUSSELDORF = 'Dusseldorf',
    BRUSSELS = 'Brussels',
    HAMBURG = 'Hamburg',
  }

export enum Actions {
    PICK_CITY = 'PICK_CITY',
    FILTER_OFFERS = 'FILTER_OFFERS',
    LOAD_OFFERS = 'LOAD_OFFERS',
    SET_STATUS_OFFERS_DATA_LOADING = 'SET_STATUS_OFFERS_DATA_LOADING',
  }

export enum SortingTypes {
    Popular = 'Popular',
    LowToHigh = 'Price: low to high',
    HighToLow = 'Price: high to low',
    TopRated = 'Top rated first',
  }

export enum APIRoute {
    Offers = '/offers',
    Questions = 'Questions',
  }

export const TIMEOUT_SHOW_ERROR = 2000;
