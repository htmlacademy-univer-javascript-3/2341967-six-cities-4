import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { getStars } from '../../const/utils';
import { AdClasses } from '../../const/const';
import { fetchOfferInfoAction } from '../../store/api-action';
import { useAppDispatch } from '../hooks';
import { setCurrentOfferId } from '../../store/page-events/page-events';

type OfferCardProps = {
  offer: Offer;
  isMainScreen: boolean;
};

export default function OfferCard({ offer, isMainScreen }: OfferCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {isFavorite, isPremium, previewImage, price, title, type, rating, id} = offer;
  return (
    <article className={isMainScreen ? AdClasses.ArticleMainAdClass : AdClasses.ArticlePropertyAdClass}
      id ={id}
      onMouseOver={ isMainScreen ? (evt)=> {
        const target = evt.currentTarget as HTMLElement;
        dispatch(setCurrentOfferId((target.id)));
      } : undefined}
      onMouseLeave={isMainScreen ? ()=> {
        dispatch(setCurrentOfferId(('0')));
      } : undefined}
    >
      {
        isMainScreen &&
        <div className="place-card__mark">
          <span>{isPremium ? 'Premium' : ''}</span>
        </div>
      }
      <div className={isMainScreen ? AdClasses.ImageWrapperMainAdClass : AdClasses.ImageWrapperPropertyAdClass}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              {isFavorite && <use xlinkHref="#icon-bookmark"></use>}
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getStars(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} onClick={() => {
            dispatch(fetchOfferInfoAction(id));
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
