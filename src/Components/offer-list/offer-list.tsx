import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';
import { useState } from 'react';

type OffersListProps = {
    offers: Offer[];
};

export default function OffersList({ offers: offers }: OffersListProps) {
  const [activeCardId, setActiveCardId] = useState({id:0});
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <OfferCard onCardMouseOver = {setActiveCardId} key={activeCardId.id + offer.id} offer={offer}/>)};
    </div>
  );
}
