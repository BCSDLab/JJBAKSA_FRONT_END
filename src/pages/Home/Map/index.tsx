import { useEffect } from 'react';
import { Overlay } from 'react-naver-maps';

import { ReactComponent as LoadingIcon } from 'assets/svg/home/map-loading.svg';
import MobileOptions from 'pages/Home/Map/components/MobileOptions';
import useCluster from 'pages/Home/Map/hooks/useCluster';
import useMarker from 'pages/Home/Map/hooks/useMarker';
import useNaverMap from 'pages/Home/Map/hooks/useNaverMap';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import { useLocation } from 'store/location';
import useFilterShops from 'utils/hooks/useFilterShops';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './Map.module.scss';

export default function Map(): JSX.Element {
  const { isMobile } = useMediaQuery();
  const { location } = useLocation();
  const map = useNaverMap(location?.lat, location?.lng);
  const { filterFriendState } = useFilterFriend();
  const { filterScrapState } = useFilterScrap();
  const { filterNearbyState } = useFilterNearby();

  const { filterShops, filterButtons } = useFilterShops();

  useEffect(() => {
    filterButtons({
      options_nearby: filterNearbyState ? 1 : 0,
      options_friend: filterFriendState ? 1 : 0,
      options_scrap: filterScrapState ? 1 : 0,
    });
  }, [filterNearbyState, filterFriendState, filterScrapState, filterButtons]);

  const { markerArray } = useMarker({ map, filterShops });
  const { cluster } = useCluster({ markerArray, map });

  return (
    <>
      {location === undefined ? <div className={styles.loading}><LoadingIcon /></div> : <div id="map" className={styles.map} />}
      {cluster && <Overlay element={{ ...cluster, setMap: () => null, getMap: () => null }} />}
      {isMobile && <MobileOptions />}
    </>
  );
}
