import { useEffect } from 'react';
import { Overlay } from 'react-naver-maps';

import MobileOptions from 'pages/Home/components/Map/components/MobileOptions';
import useCluster from 'pages/Home/components/Map/hooks/useCluster';
import useFilterShops from 'pages/Home/components/Map/hooks/useFilterShops';
import useMarker from 'pages/Home/components/Map/hooks/useMarker';
import useNaverMap from 'pages/Home/components/Map/hooks/useNaverMap';
import Pin from 'pages/Home/components/Pin/index';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import { useLocation } from 'store/location';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './Map.module.scss';

export default function Map(): JSX.Element {
  const { isMobile } = useMediaQuery();
  const { location } = useLocation();
  const map = useNaverMap(location?.lat, location?.lng);
  const { filterFriendState } = useFilterFriend();
  const { filterScrapState } = useFilterScrap();
  const { filterNearbyState } = useFilterNearby();
  const { data: filterShops, refetch } = useFilterShops({
    options_friend: filterFriendState,
    options_scrap: filterScrapState,
    options_nearby: filterNearbyState,
  });

  const { markerArray, selected } = useMarker({ map, filterShops });

  useEffect(() => {
    refetch();
  }, [filterFriendState, filterScrapState, filterNearbyState, refetch]);

  const { cluster } = useCluster({ markerArray, map });

  return (
    <>
      {isMobile && <MobileOptions />}
      {selected && <Pin selected={selected} />}
      <div id="map" className={styles.map} />
      { cluster && <Overlay element={{ ...cluster, setMap: () => null, getMap: () => null }} />}
    </>
  );
}
