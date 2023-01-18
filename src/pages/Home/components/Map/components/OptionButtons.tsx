import { ReactComponent as MenuIcon } from 'assets/svg/home/menu.svg';
import { ReactComponent as PencilIcon } from 'assets/svg/home/pencil.svg';
import { Link } from 'react-router-dom';
import styles from '../Map.module.scss';

export default function OptionButtons() {
  return (
    <div className={styles.button}>
      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={styles.list__button}
          >
            <MenuIcon />
            <span>필터</span>
          </button>
        </li>
        <li>
          <Link to="/post" className={styles.list__button}>
            <PencilIcon />
            <span>글쓰기</span>
          </Link>
        </li>
      </ul>
    </div>

  );
}
