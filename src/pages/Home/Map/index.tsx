import { useEffect } from 'react';

import { ReactComponent as LoadingIcon } from 'assets/svg/home/map-loading.svg';
import usePin from 'components/common/SideNavigation/hooks/usePin';
import MobileOptions from 'pages/Home/Map/components/MobileOptions';
// import useCluster from 'pages/Home/Map/hooks/useCluster';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import { useLocation } from 'store/location';
import { useSelected } from 'store/placeId';
import useFilterShops from 'utils/hooks/useFilterShops';
import useMarker from 'utils/hooks/useMarker';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import useNaverMap from 'utils/hooks/useNaverMap';

import styles from './Map.module.scss';

export default function Map(): JSX.Element {
  const { isMobile } = useMediaQuery();
  const { location } = useLocation();
  const map = useNaverMap(location?.lat, location?.lng);

  const { filterFriendState } = useFilterFriend();
  const { filterScrapState } = useFilterScrap();
  const { filterNearbyState } = useFilterNearby();
  const { selected } = useSelected();

  const { filterShops, filterButtons } = useFilterShops();
  const { data } = usePin(selected);

  useEffect(() => {
    filterButtons({
      options_nearby: filterNearbyState ? 1 : 0,
      options_friend: filterFriendState ? 1 : 0,
      options_scrap: filterScrapState ? 1 : 0,
    });
  }, [filterNearbyState, filterFriendState, filterScrapState, filterButtons]);

  const { markerArray } = useMarker({ map, filterShops });
  // useCluster({ markerArray, map }); // 마커 클러스터 수정 필요

  useEffect(() => {
    if (selected !== '') {
      markerArray.find((marker: any) => marker?.getTitle() === data?.name)?.trigger('click');
    }
  }, [selected, data?.name, markerArray]);

  return (
    <>
      <div id="map" className={styles.map}>
        {!location && <div className={styles.loading}><LoadingIcon /></div>}
      </div>
      {isMobile && <MobileOptions />}
    </>
  );
}
