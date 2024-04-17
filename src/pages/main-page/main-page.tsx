import OffersList from '../../Components/offer-list/offer-list.tsx';
import Header from '../../Components/header/header.tsx';
import CitiesList from '../../Components/cities-list/cities-list.tsx';
import Map from '../../Components/map/map.tsx';
import { useState } from 'react';
import { useAppSelector } from '../../Components/hooks';
import { Offer } from '../../types/offer';
import SortingTypeForm from '../../Components/sorting-type/sorting-type';
import { useSorting } from '../../Components/hooks/use-sorting';
import { SortingTypes } from '../../const/const';

type MainProps = {
  offers: Offer[];
};

export default function MainPage({ offers }: MainProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState(0);
  const currentCity = useAppSelector((state)=>state.cityName);
  const [sortingType, setSortingType] = useState<string | null>(SortingTypes.Popular);
  const sortedOffers = useSorting(offers, sortingType);
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList setSortingType={setSortingType} currentCity={currentCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">${offers.length} places to stay in {currentCity}</b>
              <SortingTypeForm onSortingTypeClick={setSortingType} sortingType={sortingType}/>
              <div className="cities__places-list places__list tabs__content">
                <OffersList isMainScreen offers={sortedOffers} setActiveOfferId={setActiveOfferId}/>
              </div>
            </section>
            <div className="cities__right-section">
              <Map isMainScreen offers={offers} activeOfferId={activeOfferId}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
