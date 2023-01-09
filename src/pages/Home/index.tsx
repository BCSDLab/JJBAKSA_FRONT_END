import useMediaQuery from 'utils/hooks/useMediaQuery';
import { Link } from 'react-router-dom';
import { ReactComponent as LensIcon } from 'assets/svg/home/mobile-lens.svg';
import styles from './Home.module.scss';
import Map from './components/Map/index';
import OptionButtons from './components/OptionButtons';

export default function Home(): JSX.Element {
  const { isMobile } = useMediaQuery();
  return (
    <div className={styles.home}>
      {isMobile && (
      <div className={styles.link}>
        <Link to="/search" className={styles.link__input}>
          검색어를 입력해주세요.
          <LensIcon />
        </Link>
      </div>
      )}
      <Map />
      <OptionButtons />
    </div>
  );
}
