import Header from '../../Components/header/header.tsx';
import CitiesList from '../../Components/cities-list/cities-list.tsx';
import Map from '../../Components/map/map.tsx';
import { useAppSelector } from '../../Components/hooks';
import OffersBoard from '../../Components/offers-board/offers-board';
import { getFilteredOffers } from '../../store/offers-data/selectors.ts';

export default function MainScreen(): JSX.Element {
  const offers = useAppSelector(getFilteredOffers);
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <OffersBoard offers={offers} />
            <div className="cities__right-section">
              <Map isMainScreen offers={offers}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

