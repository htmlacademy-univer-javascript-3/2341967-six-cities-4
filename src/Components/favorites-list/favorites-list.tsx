import { Offer } from '../../types/offer';
import FavoritesCard from '../favorites-card/favorites-card.tsx';

type FavoritesListProps = {
    offers: Offer[];
}

export default function FavoritesList({offers}: FavoritesListProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite === true).map((offer) => offer);
  const favoriteCities = favoriteOffers.map((offer) => offer.city.name).filter((value, index, self) => self.indexOf(value) === index);
  return (
    <>
      { Array.from(favoriteCities.values()).map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                {city}
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {favoriteOffers.filter((offer) => offer.city.name === city).map((offer) => <FavoritesCard key={offer.id} offer={offer}/>)}
          </div>
        </li>
      )
      )}
    </>
  );
}
