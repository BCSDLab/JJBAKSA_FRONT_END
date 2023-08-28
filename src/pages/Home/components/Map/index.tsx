// import useGeolocation from 'utils/hooks/useGeolocation';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useEffect } from 'react';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import { useLocation } from 'store/location';
import styles from './Map.module.scss';
import MobileOptions from './components/MobileOptions';
import useNaverMap from './hooks/useNaverMap';
import useMarker from './hooks/useMarker';
import useFilterShops from './hooks/useFilterShops';
import Pin from '../Pin';

export default function Map(): JSX.Element {
  const { isMobile } = useMediaQuery();
  const { location } = useLocation();
  const map = useNaverMap(location?.latitude, location?.longitude);
  const { filterFriendState } = useFilterFriend();
  const { filterScrapState } = useFilterScrap();
  const { filterNearbyState } = useFilterNearby();
  const { data: filterShops, refetch } = useFilterShops({
    options_friend: filterFriendState,
    options_scrap: filterScrapState,
    options_nearby: filterNearbyState,
  });

  const { selected } = useMarker({ map, filterShops });

  useEffect(() => {
    refetch();
  }, [filterFriendState, filterScrapState, filterNearbyState, refetch]);

  return (
    <div>
      {isMobile && <MobileOptions />}
      {selected && <Pin selected={selected} />}
      <div id="map" className={styles.map} />
    </div>
  );
}
