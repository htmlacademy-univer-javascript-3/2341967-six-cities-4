import FavoritesList from '../../Components/favorites-list/favorites-list';
import { Offer } from '../../types/offer';

type FavoriteScreenProps = {
  offers: Offer[];
}

export default function FavoritesPage ({ offers }: FavoriteScreenProps): JSX.Element {
  return (
    <div className="page">
      <header></header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <FavoritesList offers={offers}/>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}
