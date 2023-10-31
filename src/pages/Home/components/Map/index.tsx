import { Overlay } from 'react-naver-maps';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useEffect } from 'react';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import { useLocation } from 'store/location';
import SideNavigation from 'components/common/SideNavigation';
import BottomNavigation from 'components/common/BottomNavigation';
import styles from './Map.module.scss';
import MobileOptions from './components/MobileOptions';
import useNaverMap from './hooks/useNaverMap';
import useMarker from './hooks/useMarker';
import useFilterShops from './hooks/useFilterShops';
import usePlaceId from './hooks/usePlaceId';
import useCluster from './hooks/useCluster';

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

  const { markerArray, selected } = useMarker({ map, filterShops });
  const { placeId } = usePlaceId({
    title: selected?.getTitle(),
    lat: selected?.getPosition().y,
    lng: selected?.getPosition().x,
  });

  useEffect(() => {
    refetch();
  }, [filterFriendState, filterScrapState, filterNearbyState, refetch]);

  const { cluster } = useCluster({ markerArray, map });

  return (
    <>
      {isMobile && <MobileOptions />}
      {!isMobile && <SideNavigation selected={selected} placeId={placeId} />}
      <div id="map" className={styles.map}>
        {isMobile && <BottomNavigation />}
      </div>
      { cluster && <Overlay element={{ ...cluster, setMap: () => null, getMap: () => null }} />}
    </>
  );
}
