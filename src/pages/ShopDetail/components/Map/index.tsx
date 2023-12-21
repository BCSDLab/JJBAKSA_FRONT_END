import useNaverMap from 'pages/Home/components/Map/hooks/useNaverMap';
import makeToast from 'utils/ts/makeToast';
import SectionHeader from '../SectionHeader';
import styles from './Map.module.scss';

interface Props {
  formattedAddress: string;
  latitude: number;
  longitude: number;
}

function Map({ formattedAddress, latitude, longitude }: Props) {
  const copyURL = () => {
    const urlToCopy = window.location.href;

    navigator.clipboard.writeText(urlToCopy).then(() => {
      makeToast('success', 'URL을 클립보드에 복사하였습니다.');
    }).catch(() => {
      makeToast('error', 'URL을 복사하는데 실패했습니다.');
    });
  };

  useNaverMap(latitude, longitude);

  return (
    <section className={styles.container}>
      <SectionHeader
        title="지도"
        description={formattedAddress}
        button={{ content: 'URL 복사', onClick: copyURL }}
      />
      <div id="map" className={styles.map} />
    </section>
  );
}

export default Map;
