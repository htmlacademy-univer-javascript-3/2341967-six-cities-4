import FavoritesCard from '../favorites-card/favorites-card.tsx';
import { useAppSelector } from '../hooks/index.ts';
import { getFavoriteOffers } from '../../store/favorite-offers-data/selectors';
import { Link } from 'react-router-dom';

export default function FavoritesList(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const favoriteCities = new Set<string>();
  favoriteOffers.forEach((offer) => favoriteCities.add(offer.city.name));

  return (
    <>
      { Array.from(favoriteCities.values()).map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>{city}</span>
              </Link>
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
