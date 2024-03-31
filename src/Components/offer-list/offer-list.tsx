import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';

type OffersListProps = {
    offers: Offer[];
    setActiveOfferId(id:number): void;
};

export default function OffersList({ offers: offers, setActiveOfferId: setActiveOfferId }: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <OfferCard onCardMouseOver = {setActiveOfferId} key={offer.id} offer={offer}/>)};
    </div>
  );
}
