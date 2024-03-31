import { useParams } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { ReviewType} from '../../types/review';
import ReviewsList from '../../Components/review-list/review-list';
import ReviewForm from '../../Components/reviewer-form/reviewer-form';
import { getStars } from '../../const/utils';
import { useState } from 'react';
import OffersList from '../../Components/offer-list/offer-list';
import Map from '../../Components/map/map';

type OfferScreenProps = {
  offers: Offer[];
  reviews: ReviewType[];
};

export default function OfferPage({ offers, reviews }: OfferScreenProps): JSX.Element {
  const {id} = useParams();
  const [{isFavorite, isPremium, description, amenities, host,
    images, rating, maxAdults, price, title, type, bedrooms}] = offers.filter((offer) => offer.id.toString() === id);
  const [activeOfferId, setActiveOfferId] = useState(0);
  return (
    <div className="page">
      <header></header>

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
                <button className={`offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button">
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
                  {amenities.map((amenity) => (
                    <li className="offer__inside-item" key={amenity}>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className={host.avatar}
                      src="img/avatar-angelina.jpg"
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
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews}/>
                <ReviewForm/>
              </section>
            </div>
          </div>
          <Map isMainScreen={false} offers={offers.slice(0,3)} activeOfferId={activeOfferId}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
                            Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList isMainScreen={false} offers={offers.slice(0,3)} setActiveOfferId={setActiveOfferId}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
