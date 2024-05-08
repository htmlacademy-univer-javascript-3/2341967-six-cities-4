import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getSortType } from '../../store/page-events/selectors';
import { setSortType } from '../../store/page-events/page-events';

export default function SortingTypeForm(): JSX.Element {
  const [sortingOptionsOpened, setSortingOptionsOpened] = useState(false);
  const sortingType = useAppSelector(getSortType);
  const dispatch = useAppDispatch();

  return(
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setSortingOptionsOpened(!sortingOptionsOpened)}>
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${sortingOptionsOpened ? 'places__options--opened' : 'places__options--closed'}`}
        onClick={(evt) => {
          const target = evt.target as HTMLElement;
          if(target.tagName !== 'LI') {
            return;
          }
          dispatch(setSortType(target.textContent || ''));
          setSortingOptionsOpened(!sortingOptionsOpened);
        }}
      >
        <li className={`places__option ${sortingType === 'Popular' ? 'places__option--active' : ''}`} tabIndex={0}>Popular</li>
        <li className={`places__option ${sortingType === 'Price: low to high' ? 'places__option--active' : ''}`} tabIndex={0}>Price: low to high</li>
        <li className={`places__option ${sortingType === 'Price: high to low' ? 'places__option--active' : ''}`} tabIndex={0}>Price: high to low</li>
        <li className={`places__option ${sortingType === 'Top rated first' ? 'places__option--active' : ''}`} tabIndex={0}>Top rated first</li>
      </ul>
    </form>
  );
}
