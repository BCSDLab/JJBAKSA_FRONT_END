import useNaverMap from 'pages/Home/components/Map/hooks/useNaverMap';
import SectionHeader from '../SectionHeader';
import styles from './Map.module.scss';

interface Props {
  formattedAddress: string;
  latitude: number;
  longitude: number;
}

function Map({ formattedAddress, latitude, longitude }: Props) {
  useNaverMap(latitude, longitude);

  return (
    <section className={styles.container}>
      <SectionHeader
        title="지도"
        description={formattedAddress}
        button={{ name: 'URL 복사', handler: () => {} }}
      />
      <div id="map" className={styles.map} />
    </section>
  );
}

export default Map;
