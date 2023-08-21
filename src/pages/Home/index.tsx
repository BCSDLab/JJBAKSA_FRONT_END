import { ReactComponent as Arrow } from 'assets/svg/home/arrow.svg';
import React, { useState } from 'react';
import Map from './components/Map';
import styles from './Home.module.scss';
import Location from './components/Map/components/Location/index';

export default function Home(): JSX.Element {
  const [isClickLocation, setIsCilckLocation] = useState(false);

  const locationClick = () => {
    setIsCilckLocation(true);
  };

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter' || event.key === ' ') {
      locationClick();
    }
  };

  return (
    <div className={styles.home}>
      <div
        className={styles['map-container']}
        onClick={locationClick}
        onKeyDown={handleKeyPress}
        role="button"
        tabIndex={0}
      >
        충청북도 천안시 병천면 충절로 1600
        <Arrow className={styles['map-container__image']} />
      </div>
      <div className={styles.map}>
        <Map />
      </div>
      {isClickLocation && (
        <div className={styles.locationBox}>
          <Location />
        </div>
      )}
    </div>
  );
}
