import { Link } from 'react-router-dom';
import { SortingTypes } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { filterOffers, setCity } from '../../store/offers-data/offers-data';
import { setSortType } from '../../store/page-events/page-events';
import { getCityName } from '../../store/offers-data/selectors';

export default function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCityName);

  return (
    <ul className="locations__list tabs__list" onClick={(evt) => {
      const target = evt.target as HTMLElement;
      if (target.tagName !== 'A' && target.tagName !== 'SPAN') {
        return;
      }
      dispatch(setCity(target.firstChild?.textContent ? target.firstChild.textContent : ''));
      dispatch(filterOffers());
      dispatch(setSortType(SortingTypes.Popular));
    }}
    >
      <li className="locations__item">
        <Link className={`locations__item-link tabs__item ${currentCity === 'Paris' ? 'tabs__item--active' : ''}`} city-name="Paris" to="#">
          <span>Paris</span>
        </Link>
      </li>
      <li className="locations__item">
        <Link className={`locations__item-link tabs__item ${currentCity === 'Cologne' ? 'tabs__item--active' : ''}`} city-name="Cologne" to="#">
          <span>Cologne</span>
        </Link>
      </li>
      <li className="locations__item">
        <Link className={`locations__item-link tabs__item ${currentCity === 'Brussels' ? 'tabs__item--active' : ''}`} city-name="Brussels" to="#">
          <span>Brussels</span>
        </Link>
      </li>
      <li className="locations__item">
        <Link className={`locations__item-link tabs__item ${currentCity === 'Amsterdam' ? 'tabs__item--active' : ''}`} city-name="Amsterdam" to="#">
          <span>Amsterdam</span>
        </Link>
      </li>
      <li className="locations__item">
        <Link className={`locations__item-link tabs__item ${currentCity === 'Hamburg' ? 'tabs__item--active' : ''}`} city-name="Hamburg" to="#">
          <span>Hamburg</span>
        </Link>
      </li>
      <li className="locations__item">
        <Link className={`locations__item-link tabs__item ${currentCity === 'Dusseldorf' ? 'tabs__item--active' : ''}`} city-name="Dusseldorf" to="#">
          <span>Dusseldorf</span>
        </Link>
      </li>
    </ul>
  );
}
