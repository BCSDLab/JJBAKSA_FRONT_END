import { ReactComponent as Arrow } from 'assets/svg/home/arrow.svg';
import React, { useEffect, useState } from 'react';
import { Container as MapDiv } from 'react-naver-maps';
import axios from 'axios';
import useBooleanState from 'utils/hooks/useBooleanState';
import styles from './Home.module.scss';
import Location from './components/Map/components/Location/index';
import NaverMap from './components/Map';

export default function Home(): JSX.Element {
  const [isClickLocation, active, unactive] = useBooleanState(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
    address: string | null;
  }>({
    latitude: null,
    longitude: null,
    address: null,
  });

  const getAddressFromCoords = async (
    latitude: number,
    longitude: number,
  ): Promise<string> => {
    const apiKey = process.env.REACT_APP_NAVER_CLOUD_MAPS_CLIENT_ID as string;
    const apiSecretKey = process.env.REACT_APP_NAVER_CLOUD_MAPS_CLIENT_SECRET_ID as string;
    const response = await axios.get('/map-reversegeocode/v2/gc', {
      params: {
        coords: `${longitude},${latitude}`,
        sourcecrs: 'epsg:4326',
        orders: 'roadaddr',
        output: 'json',
      },
      headers: {
        'X-NCP-APIGW-API-KEY-ID': apiKey,
        'X-NCP-APIGW-API-KEY': apiSecretKey,
      },
    });
    const { data } = response;
    if (data && data.results && data.results.length > 0) {
      return `${data.results[0].region.area1.name} ${data.results[0].region.area2.name}`;
    }
    return '주소 정보 없음';
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const addressData = await getAddressFromCoords(
            position.coords.latitude,
            position.coords.longitude,
          );
          setUserLocation((prevUserLocation) => ({
            ...prevUserLocation,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: addressData,
          }));
        },
        (error) => {
          console.error('에러', error);
        },
      );
    }
  }, []);

  const handleActive = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      active();
    }
  };

  const handleUnactive = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      unactive();
    }
  };

  return (
    <div className={styles.home}>
      <div
        className={styles['map-container']}
        onClick={active}
        onKeyDown={handleActive}
        role="button"
        tabIndex={0}
      >
        {userLocation.address !== null ? (
          <div className={styles['map-container__text']}>
            {userLocation.address}
          </div>
        ) : (
          <div className={styles['map-container__text']}>
            위치 정보를 가져오는 중...
          </div>
        )}
        <Arrow className={styles['map-container__image']} />
      </div>
      <div
        className={styles.map}
        onClick={unactive}
        onKeyDown={handleUnactive}
        role="button"
        tabIndex={0}
      >
        <MapDiv>
          <NaverMap />
        </MapDiv>
      </div>
      {isClickLocation && (
        <div className={styles.locationBox}>
          <Location unactive={unactive} />
        </div>
      )}
    </div>
  );
}
