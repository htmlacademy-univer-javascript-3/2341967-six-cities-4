import ReviewsList from '../../Components/review-list/review-list';
import ReviewForm from '../../Components/reviewer-form/reviewer-form';
import { getStars } from '../../const/utils';
import OffersList from '../../Components/offer-list/offer-list';
import Map from '../../Components/map/map';
import Header from '../../Components/header/header';
import NotFoundPage from '../not-found-page/not-found-page';
import { useAppSelector, useAppDispatch } from '../../Components/hooks';
import { getCurrentOfferDataLoadingStatus, getNearbyOffers, getOfferInfo } from '../../store/current-offer-data/selectors';
import { getAuthorizationStatus } from '../../store/authorization-user-process/selectors';
import Footer from '../../Components/footer/footer';
import browserHistory from '../../browser-history';
import { setOfferFavoriteStatusAction } from '../../store/api-action';
import { AppRoute } from '../../const/const';
import { useState } from 'react';

export default function OfferScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const offer = useAppSelector(getOfferInfo);
  const isCurrenOfferDataLoading = useAppSelector(getCurrentOfferDataLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const [isFavoriteOffer, setFavoriteOffer] = useState<boolean | null>(offer?.isFavorite ? offer.isFavorite : null);

  if (offer && !isCurrenOfferDataLoading) {
    const {id, isPremium, description, goods, host, images, rating, maxAdults, price, title, type, bedrooms} = offer;
    const favoriteStatus = `${+!isFavoriteOffer}`;
    const handleFavoriteButtonClick = () => {
      if(authorizationStatus !== 'AUTH') {
        browserHistory.push(AppRoute.Login);

        return;
      }
      setFavoriteOffer((prevState) => !prevState);
      dispatch(setOfferFavoriteStatusAction({id, favoriteStatus}));
    };

    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {images.map((image) => (
                  (
                    <div className="offer__image-wrapper" key = {image}>
                      <img className="offer__image" src={image} alt="studio"/>
                    </div>
                  )
                ))}
                <div className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src="img/apartment-01.jpg"
                    alt="Photo studio"
                  />
                </div>
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                <div className="offer__mark">
                  <span>{isPremium ? 'Premium' : ''}</span>
                </div>
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{title}</h1>
                  <button className={`offer__bookmark-button button ${isFavoriteOffer ? 'offer__bookmark-button--active' : ''}`} onClick={handleFavoriteButtonClick} type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: getStars(rating) }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {`${bedrooms} Bedrooms`}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    {`Max ${maxAdults} adults`}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {goods.map((good) => (
                      <li className="offer__inside-item" key={good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{host.name}</span>
                    <span className="offer__user-status">{host.isPro ? 'Pro' : ''}</span>
                  </div>
                  <div className="offer__description">
                    {description.split('.').map((sentense) => (
                      <p className="offer__text" key={sentense}>
                        {sentense}
                      </p>
                    ))}
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <ReviewsList />
                  {
                    authorizationStatus === 'AUTH' &&
                    <ReviewForm id={offer.id}/>
                  }
                </section>
              </div>
            </div>
            <Map isMainScreen={false} offers={[...nearbyOffers, offer]}/>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                              Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                <OffersList isMainScreen={false} offers={nearbyOffers}/>
              </div>
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    );
  }

  return <NotFoundPage />;
}
