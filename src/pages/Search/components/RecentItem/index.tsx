import { Link } from 'react-router-dom';

import defaultImage from 'assets/images/search/default-image.png';
import { ReactComponent as ClockIcon } from 'assets/svg/common/clock.svg';
import { ReactComponent as PcDeleteIcon } from 'assets/svg/common/close.svg';
import { ReactComponent as MobileDeleteIcon } from 'assets/svg/search/delete.svg';
import { Card } from 'pages/Search/static/entity';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './RecentItem.module.scss';

interface Props {
  data: Card;
  index: number;
  deleteCard: (x: string) => void;
}

export default function RecentItem({
  data, index, deleteCard,
}: Props) {
  const {
    category, name, photoToken, placeId,
  } = data;

  const { isMobile } = useMediaQuery();

  if (index < 5) {
    return (
      <Link
        className={styles.item}
        to={`/shop/${placeId}`}
        state={{ placeId }}
      >
        <div className={styles.container}>
          {!isMobile && (
            <img
              alt="imageAlt"
              src={photoToken ?? defaultImage}
              className={styles.image}
            />
          )}
          <div className={styles.description}>
            {isMobile
              ? <ClockIcon />
              : <div className={styles.description__category}>{category}</div>}
            <div className={styles.description__name}>{name}</div>
          </div>

          {isMobile
            ? (
              <button
                className={styles.delete}
                type="button"
                onClick={() => deleteCard(placeId)}
                aria-label="삭제"
              >
                <MobileDeleteIcon />
              </button>
            ) : (
              <div className={styles.cover}>
                <button
                  className={styles.cover__delete}
                  type="button"
                  onClick={() => deleteCard(placeId)}
                  aria-label="삭제"
                >
                  <PcDeleteIcon />
                </button>
              </div>
            )}
        </div>
      </Link>
    );
  } return null;
}
