import React, { useEffect, useRef,useState } from 'react';

import './MapComponent.css'

const YandexMap = ({ center = [55.755826, 37.6172999], zoom = 10, buildings = [] }) => {
  const [isApiLoaded, setApiLoaded] = useState(false);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (window.ymaps) {
      setApiLoaded(true);
    } else {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      document.head.appendChild(script);

      script.onload = () => {
        window.ymaps.ready(() => setApiLoaded(true));
      };
    }
  }, []);

  useEffect(() => {
    if (isApiLoaded) {

      const map = new window.ymaps.Map(mapContainerRef.current, {
        center,
        zoom,
        controls: [],
      });

      buildings.forEach(({ coordinates, name }) => {
        const placemark = new window.ymaps.Placemark(coordinates, {
          hintContent: name,
        });
        map.geoObjects.add(placemark);
      });
    }
  }, [isApiLoaded, center, zoom, buildings]);

  if (!isApiLoaded) {
    return <div>Loading map...</div>;
  }

  return <div ref={mapContainerRef} style={{ width: '100%', height: 'calc(100vh - 120px)' }} />;
};

const YSUMap = () => {
  const buildings = [
    { id: 'ysu1', name: '1-ый корпус (Советская, 14)', coordinates: [57.632756,39.887265], url: 'z', },
    { id: 'ysu2', name: '2-ой корпус (Кирова, 8/10)', coordinates: [57.626342,39.890041], url: 'z', },
    { id: 'ysu3', name: '3-ий корпус (Советская, 10)', coordinates: [57.631122,39.889816], url: 'z', },
    { id: 'ysu4', name: '4-ый корпус (проезд Матросова, 9)', coordinates: [57.573992,39.857279], url: 'z', },
    { id: 'ysu6', name: '6-ой корпус (Комсомольская, 3)', coordinates: [57.625046,39.884857], url: 'z', },
    { id: 'ysu7', name: '7-ой корпус (Союзная, 141)', coordinates: [57.621995,39.932279], url: 'z', },
    { id: 'ysu8', name: '8-ой корпус (Собинова, 36а)', coordinates: [57.626342,39.881093], url: 'z', },
    { id: 'ysu-K', name: 'Университетский колледж (Слепнева, 14б)', coordinates: [57.579122,39.861887], url: 'z', },
    { id: 'ysu10', name: '10-ый корпус (Полушкина роща, 1а)', coordinates: [57.645455,39.877078], url: 'z', },
  ];

  return (
    <YandexMap center={[57.632756,39.887265]} zoom={13} buildings={buildings} />
  );
};

export default YSUMap;
