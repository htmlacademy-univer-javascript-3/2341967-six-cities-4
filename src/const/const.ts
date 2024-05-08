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
    SET_SORT_TYPE = 'SET_SORT_TYPE',
    FILTER_OFFERS = 'FILTER_OFFERS',
    LOAD_OFFERS = 'LOAD_OFFERS',
    SET_STATUS_OFFERS_DATA_LOADING = 'SET_STATUS_OFFERS_DATA_LOADING',
    REQUIRE_AUTHORIZATION = 'REQUIRE_AUTHORIZATION',
    SET_USER_EMAIL = 'SET_USER_EMAIL',
    SET_ERROR = 'SET_ERROR',
    REDIRECT_ROUTE = 'REDIRECT_ROUTE',
    LOAD_OFFER_INFO = 'LOAD_OFFER_INFO',
    LOAD_NEARBY_OFFERS = 'LOAD_NEARBY_OFFERS',
    LOAD_OFFER_COMMENTS = 'LOAD_OFFER_COMMENTS',
    SET_CURRENT_OFFER_ID = 'SET_CURRENT_OFFER_ID',
    SET_CURRENT_OFFER_DATA_LOADING = 'SET_CURRENT_OFFER_DATA_LOADING',
    SET_COMMENT_DATA_SENDING = 'SET_COMMENT_DATA_SENDING',
    ADD_REVIEW = 'ADD_REVIEW'
  }

export enum SortingTypes {
    Popular = 'Popular',
    LowToHigh = 'Price: low to high',
    HighToLow = 'Price: high to low',
    TopRated = 'Top rated first',
  }

export enum APIRoute {
    Offers = '/offers/',
    Login = '/login',
    Logout = '/logout',
    Comment = '/comments/',
    NearbyOffers = '/nearby'
  }

export const TIMEOUT_SHOW_ERROR = 2000;

export enum SlicesName {
  Page = 'PAGE',
  User = 'USER',
  OffersData = 'OFFERS_DATA',
  CurrentOfferData = 'CURRENT_OFFER_DATA',
  UserReview = 'USER_REVIEW',
}
