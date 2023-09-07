import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useEffect, useState } from 'react';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import { useLocation } from 'store/location';
import { fetchShops } from 'api/shop';
import SideNavigation from 'components/common/SideNavigation';
import BottomNavigation from 'components/common/BottomNavigation';
import styles from './Map.module.scss';
import MobileOptions from './components/MobileOptions';
import useNaverMap from './hooks/useNaverMap';
import useMarker from './hooks/useMarker';
import useFilterShops from './hooks/useFilterShops';

export default function Map(): JSX.Element {
  const [placeId, setPlaceId] = useState<string>('');
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

  useEffect(() => {
    const getPlceId = async () => {
      const shops = await fetchShops(
        {
          keyword: selected?.getTitle() || '',
          location: { lat: selected?.getPosition().y, lng: selected?.getPosition().x },
        },
      );
      if (shops.data.shopQueryResponseList.length !== 0) {
        setPlaceId(shops.data?.shopQueryResponseList[0].placeId || '');
      }
    };
    getPlceId();
  }, [selected]);

  return (
    <div>
      {isMobile && <MobileOptions />}
      {!isMobile && <SideNavigation selected={selected} placeId={placeId} />}
      <div id="map" className={styles.map} />
      {isMobile && <BottomNavigation />}
    </div>
  );
}
