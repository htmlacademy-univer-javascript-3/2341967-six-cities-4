import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../hooks/use-map.tsx';
import { Offer } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT, MapClasses } from '../../const/const';
import 'leaflet/dist/leaflet.css';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

type MapProps = {
   offers: Offer[];
   activeOfferId: number;
   isMainScreen: boolean;
}

export default function Map(props: MapProps): JSX.Element {
  const {offers, activeOfferId, isMainScreen} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0]);

  useEffect(() => {
    if (map) {
      offers.forEach((offer: Offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(
          activeOfferId !== undefined && offer.id === activeOfferId
            ? currentCustomIcon
            : defaultCustomIcon
        )
          .addTo(map);
      });
    }
  }, [map, offers, activeOfferId]);

  return (
    <section className={isMainScreen ? MapClasses.SectionMainMapClass : MapClasses.SectionPropertyMapClass} ref={mapRef}></section>
  );
}
