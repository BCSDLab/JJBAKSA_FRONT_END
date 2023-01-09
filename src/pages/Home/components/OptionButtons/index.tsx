import { ReactComponent as MenuIcon } from 'assets/svg/home/menu.svg';
import { ReactComponent as PencilIcon } from 'assets/svg/home/pencil.svg';
import { Link } from 'react-router-dom';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import FilterMenu from './FilterMenu';
import styles from './OptionButtons.module.scss';

export default function OptionButtons(): JSX.Element {
  const { isMobile } = useMediaQuery();
  return (
    <div>
      { isMobile ? <FilterMenu /> : (
        <ul className={styles.button}>
          <li>
            <button type="button" className={styles.button__text}>
              <MenuIcon />
              <span>필터</span>
            </button>
          </li>
          <li>
            <Link to="/post" className={styles.button__text}>
              <PencilIcon />
              <span>글쓰기</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
