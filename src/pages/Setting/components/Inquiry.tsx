import styles from './Inquiry.module.scss';

export default function Inquiry(): JSX.Element {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.header__title}>문의하기</div>
        <div className={styles['header__sub-title']}>쩝쩝박사에게 궁금한 점이 있나요?</div>
      </div>
      <hr className={styles.mainline} />
      <div className={styles.box}>
        <div className={styles.box__number}>NO</div>
        <div className={styles.box__title}>TITLE</div>
        <div>NAME</div>
        <div className={styles.box__date}>DATE</div>
        <div>HIT</div>
      </div>
      <hr className={styles.line} />
      <div className={styles.footer}>
        <input type="text" value="제목 혹은 작성자를 검색해보세요!" className={styles.search} />
        <button type="submit" className={styles['footer__search-button']}>찾기</button>
      </div>
    </div>
  );
}
