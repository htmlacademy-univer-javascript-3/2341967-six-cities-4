import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../hooks/use-map';
import { Offer } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT, MapClasses } from '../../const/const';
import { useAppSelector } from '../hooks';
import { getCurrentOfferId } from '../../store/page-events/selectors';
import 'leaflet/dist/leaflet.css';

const defaultIconImage = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentIconImage = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});


type MapProps = {
   offers: Offer[];
   isMainScreen: boolean;
}


export default function Map(props: MapProps): JSX.Element {
  const {offers, isMainScreen} = props;
  const activeOfferId = useAppSelector(getCurrentOfferId);
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0]);

  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer.options.pane === 'markerPane') {
          map.removeLayer(layer);
        }
      });

      offers.forEach((offer: Offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(
          activeOfferId !== undefined && offer.id === activeOfferId
            ? currentIconImage
            : defaultIconImage
        )
          .addTo(map);
      });
    }
  }, [map, offers, activeOfferId]);

  useEffect(() => {
    if (map) {
      map.flyTo([offers[0].city.location.latitude, offers[0].city.location.longitude], offers[0].city.location.zoom);
    }
  }, [map, offers]);

  return (
    <section className={isMainScreen ? MapClasses.SectionMainMapClass : MapClasses.SectionPropertyMapClass} ref={mapRef}></section>
  );
}
