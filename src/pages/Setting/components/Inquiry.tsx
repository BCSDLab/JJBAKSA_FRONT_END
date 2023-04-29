import styles from './Inquiry.module.scss';

export default function Inquiry(): JSX.Element {
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.header__title}>문의하기</h1>
        <h3 className={styles['header__sub-title']}>쩝쩝박사에게 궁금한 점이 있나요?</h3>
      </header>
      <div className={styles.body}>
        <hr className={styles['line--first']} />
        <div className={styles.box}>
          <div>NO</div>
          <div>TITLE</div>
          <div>NAME</div>
          <div>DATE</div>
          <div>HIT</div>
        </div>
        <hr className={styles['line--second']} />
      </div>
      <div className={styles.footer}>
        <input placeholder="제목 혹은 작성자를 검색해보세요!" className={styles.footer__search} />
        <button type="submit" className={styles['footer__search-button']}>찾기</button>
      </div>
    </div>
  );
}
