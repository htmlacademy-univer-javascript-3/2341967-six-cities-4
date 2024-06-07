import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { getStars } from '../../const/utils';
import { AdClasses, AppRoute} from '../../const/const';
import { getOfferInfoAction, setOfferFavoriteStatusAction } from '../../store/api-action';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCurrentOfferId } from '../../store/page-events/page-events';
import { getAuthorizationStatus } from '../../store/authorization-user-process/selectors';
import browserHistory from '../../browser-history';

type OfferCardProps = {
  offer: Offer;
  isMainScreen: boolean;
};

export default function OfferCard({ offer, isMainScreen }: OfferCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {isFavorite, isPremium, previewImage, price, title, type, rating, id} = offer;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteStatus = `${+!isFavorite}`;
  const handleFavoriteClick = () => {
    if(authorizationStatus !== 'AUTH') {
      browserHistory.push(AppRoute.Login);

      return;
    }
    dispatch(setOfferFavoriteStatusAction({id, favoriteStatus}));
  };

  return (
    <article className={isMainScreen ? AdClasses.ArticleMainAdClass : AdClasses.ArticlePropertyAdClass} onMouseOver={()=> {
      dispatch(setCurrentOfferId(id));
    }}
    >
      {
        isMainScreen &&
        <div className="place-card__mark">
          <span>{isPremium ? 'Premium' : ''}</span>
        </div>
      }
      <div className={isMainScreen ? AdClasses.ImageWrapperMainAdClass : AdClasses.ImageWrapperPropertyAdClass}>
        <Link to={`/offer/${offer.id}`} onClick={() => {
          dispatch(getOfferInfoAction(id.toString()));
        }}
        >
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} onClick={handleFavoriteClick} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating" data-test={getStars(rating)}>
          <div className="place-card__stars rating__stars">
            <span style={{width: getStars(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`} onClick={() => {
            dispatch(getOfferInfoAction(id.toString()));
          }}
          >
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
