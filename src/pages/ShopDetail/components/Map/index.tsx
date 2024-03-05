import SectionHeader from 'pages/ShopDetail/components/SectionHeader/index';
import useNaverMap from 'utils/hooks/useNaverMap';

import styles from './Map.module.scss';

interface Props {
  formattedAddress: string;
  latitude: number | undefined;
  longitude: number | undefined;
}

function Map({ formattedAddress, latitude, longitude }: Props) {
  useNaverMap(latitude, longitude);

  return (
    <section className={styles.container}>
      <SectionHeader
        title="지도"
        description={formattedAddress}
      />
      <div id="map" className={styles.map} />
    </section>
  );
}

export default Map;
