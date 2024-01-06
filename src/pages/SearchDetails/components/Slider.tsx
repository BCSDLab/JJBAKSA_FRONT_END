import styles from '../SearchDetails.module.scss';

export default function Slider() {
  return (
    <div className={styles.slider}>
      <div className={styles.map__naver}>
        네이버 지도에서 열기
      </div>
      <div className={styles.map__kakao}>
        카카오 맵에서 열기
      </div>
      <div className={styles.close}>
        닫기
      </div>
    </div>
  );
}
