/* eslint-disable jsx-a11y/label-has-associated-control */
import Cap from 'assets/images/search/image-100.png';

import styles from '../SearchDetails.module.scss';

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
      <label className={styles.container}>
        <input type="checkbox" className={styles.checkbox} />
        <span className={styles.checkmark} />
      </label>
    </div>
  );
}
