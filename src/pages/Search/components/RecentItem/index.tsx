import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as ClockIcon } from 'assets/svg/common/clock.svg';
import { ReactComponent as PcDeleteIcon } from 'assets/svg/common/close.svg';
import defaultImage from 'assets/svg/common/favicon.svg';
import { ReactComponent as MobileDeleteIcon } from 'assets/svg/search/mobile-delete.svg';
import { ReactComponent as NotFoundImageIcon } from 'assets/svg/shop/not-found.svg';
import { Card } from 'pages/Search/static/entity';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './RecentItem.module.scss';

interface Props {
  card: Card;
  deleteCard: (target: Card) => void;
}

export default function RecentItem({
  card, deleteCard,
}: Props) {
  const {
    category, name, photoToken, placeId,
  } = card;

  const location = useLocation();
  const { isMobile } = useMediaQuery();

  const newPath = location.pathname.includes('/post') ? `/post/${placeId}?shopName=${name}` : `/shop/${placeId}?shopName=${name}`;

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    deleteCard(card);
  };

  return (
    <Link
      className={styles.container}
      to={newPath}
    >
      {!isMobile && (
        <div className={styles.card}>
          {photoToken ? (
            <picture>
              <source srcSet={defaultImage} />
              <img
                alt="imageAlt"
                src={photoToken}
                className={styles.card__image}
              />
            </picture>
          ) : (
            <div className={styles['card__image--empty']}>
              <NotFoundImageIcon />
              <div>등록된 사진이 없어요!</div>
            </div>
          )}
          <div className={styles.description}>
            <div className={styles.description__category}>{category}</div>
            <div className={styles.description__name}>{name}</div>
          </div>

          <div className={styles.cover}>
            <button
              className={styles.cover__delete}
              type="button"
              onClick={handleDelete}
              aria-label="삭제"
            >
              <PcDeleteIcon />
            </button>
          </div>
        </div>
      )}

      {isMobile && (
        <div className={styles.line}>
          <ClockIcon />
          <div className={styles.line__description}>
            {name}
          </div>
          <button
            className={styles.line__delete}
            type="button"
            onClick={handleDelete}
            aria-label="삭제"
          >
            <MobileDeleteIcon />
          </button>
        </div>
      )}
    </Link>
  );
}
