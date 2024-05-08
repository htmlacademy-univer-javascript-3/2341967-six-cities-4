import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';

type OffersListProps = {
    offers: Offer[];
    isMainScreen: boolean;
};

export default function OffersList({ offers, isMainScreen }: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <OfferCard isMainScreen={isMainScreen} key={offer.id} offer={offer}/>)};
    </div>
  );
}
