import { useEffect, useState } from 'react';
import { Overlay } from 'react-naver-maps';

import { ReactComponent as LoadingIcon } from 'assets/svg/home/map-loading.svg';
import MobileOptions from 'pages/Home/components/Map/components/MobileOptions';
import useCluster from 'pages/Home/components/Map/hooks/useCluster';
import useMarker from 'pages/Home/components/Map/hooks/useMarker';
import useNaverMap from 'pages/Home/components/Map/hooks/useNaverMap';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import { useLocation } from 'store/location';
import useFilterShops from 'utils/hooks/useFilterShops';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './Map.module.scss';

export default function Map({ className }: { className?: string }): JSX.Element {
  const { isMobile } = useMediaQuery();
  const { location } = useLocation();
  const [loading, setLoading] = useState(true);
  const map = useNaverMap(location?.lat, location?.lng);
  const { filterFriendState } = useFilterFriend();
  const { filterScrapState } = useFilterScrap();
  const { filterNearbyState } = useFilterNearby();
  const { data: filterShops, refetch } = useFilterShops({
    options_friend: filterFriendState ? 1 : 0,
    options_scrap: filterScrapState ? 1 : 0,
    options_nearby: filterNearbyState ? 1 : 0,
  });

  const { markerArray } = useMarker({ map, filterShops });

  useEffect(() => {
    refetch();
  }, [filterFriendState, filterScrapState, filterNearbyState, refetch]);

  const { cluster } = useCluster({ markerArray, map });

  useEffect(() => {
    if (location) {
      setLoading(false);
    }
  }, [location]);

  return (
    <div className={className}>
      <div id="map" className={styles.map} />
      {loading ? <div className={styles.loading}><LoadingIcon /></div> : null }
      {cluster && <Overlay element={{ ...cluster, setMap: () => null, getMap: () => null }} />}
      {isMobile && <MobileOptions />}
    </div>
  );
}
