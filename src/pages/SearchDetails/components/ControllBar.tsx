import styles from 'pages/SearchDetails/SearchDetails.module.scss';
import Cap from 'assets/images/search/image-100.png';

export default function ControllBar() {
  return (
    <div className={styles.controller}>
      <div className={styles.icon__head}>
        <img alt="가게 이미지 없음" src={Cap} />
      </div>
      <div className={styles.icon__middle}>
        <img alt="가게 이미지 없음" src={Cap} />
      </div>
      <div className={styles.icon__tail}>
        <img alt="가게 이미지 없음" src={Cap} />
      </div>
      <label htmlFor="friend" className={styles.label}>
        <input type="checkbox" id="friend" name="friend" className={styles.checkbox} />
      </label>
    </div>
  );
}
