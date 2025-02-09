import './map.less';

import leaflet from 'leaflet';
import { useEffect, useRef } from 'react';

type MapType = {
  lang: number | undefined;
  lat: number | undefined;
};

function Map({ lat, lang }: MapType) {
  const mapRef = useRef<any>();

  //   console.log(lat, lang);
  useEffect(() => {
    if (lat && lang) {
      mapRef.current = leaflet.map('map').setView([lat, lang], 13);
      leaflet
        .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(mapRef.current);

      leaflet.marker([lat, lang]).addTo(mapRef.current);
    }
  }, [lang, lat]);

  return <div id="map" ref={mapRef}></div>;
}

export default Map;
