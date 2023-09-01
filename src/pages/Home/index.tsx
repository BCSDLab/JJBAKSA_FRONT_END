import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Container as MapDiv } from 'react-naver-maps';
import { ReactComponent as Arrow } from 'assets/svg/home/arrow.svg';
import useBooleanState from 'utils/hooks/useBooleanState';
import { NAVER_MAPS_CLIENT_ID, NAVER_MAP_CLOUD_SECRET_ID } from 'config/constants';
import Location from './components/Map/components/Location/index';
import NaverMap from './components/Map';
import styles from './Home.module.scss';

export default function Home(): JSX.Element {
  const [isClickLocation, active, unactive] = useBooleanState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: null as number | null,
    longitude: null as number | null,
    address: null as string | null,
  });
  const locationBoxRef = useRef<HTMLDivElement | null>(null);

  const getAddressFromCoords = async (latitude: number, longitude: number): Promise<string> => {
    const response = await axios.get('/map-reversegeocode/v2/gc', {
      params: {
        coords: `${longitude},${latitude}`,
        sourcecrs: 'epsg:4326',
        orders: 'roadaddr',
        output: 'json',
      },
      headers: {
        'X-NCP-APIGW-API-KEY-ID': NAVER_MAPS_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': NAVER_MAP_CLOUD_SECRET_ID,
      },
    });
    const { data } = response;

    if (data?.results?.length > 0) {
      return `${data.results[0].region.area1.name} ${data.results[0].region.area2.name}`;
    }

    return '주소 정보 없음';
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationBoxRef.current && !locationBoxRef.current.contains(event.target as Node)) {
        unactive();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [unactive]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
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
      }, (error) => {
        console.error('에러', error);
      });
    }
  }, []);

  return (
    <div className={styles.home}>
      <div
        className={styles['map-container']}
        onClick={active}
        onKeyDown={active}
        role="button"
        tabIndex={0}
      >
        {userLocation.address ? (
          <div className={styles['map-container__text']}>{userLocation.address}</div>
        ) : (
          <div className={styles['map-container__text']}>위치 정보를 가져오는 중...</div>
        )}
        <Arrow className={styles['map-container__image']} />
      </div>
      <div className={styles.map}>
        <MapDiv>
          <NaverMap />
        </MapDiv>
      </div>
      {isClickLocation && (
        <div
          className={styles.locationBox}
          ref={locationBoxRef}
          role="button"
          tabIndex={0}
        >
          <div>
            <Location />
          </div>
        </div>
      )}
    </div>
  );
}
