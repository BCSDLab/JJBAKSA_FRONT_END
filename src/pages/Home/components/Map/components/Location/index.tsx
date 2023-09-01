import { ReactComponent as Search } from 'assets/svg/home/search.svg';
import { ReactComponent as Point } from 'assets/svg/home/point.svg';
import styles from './Location.module.scss';

export default function Location(): JSX.Element {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.box__title}>현재 위치가 올바르지 않은가요?</div>
          <div className={styles.box__subTitle}>현재 계신 곳의 위치를 아래 검색창을 통해</div>
          <div className={styles.box__subTitle}>알려주시면 반영하겠습니다.</div>
        </div>
        <div className={styles.search}>
          <div className={styles.search__box}>
            <Search className={styles.search__image} />
            <input type="text" className={styles.search__text} placeholder="지번, 도로명, 건물명으로 검색해주세요." />
          </div>
          <button className={styles.search__button} type="button">등록</button>
        </div>
        <div className={styles.location}>
          <div className={styles.location__active}>
            <Point className={styles.location__image} />
            현재 위치로 설정
          </div>
        </div>
      </div>
    </div>
  );
}
