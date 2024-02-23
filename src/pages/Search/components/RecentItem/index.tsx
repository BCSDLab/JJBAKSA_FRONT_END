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
          <div className={styles['card__image-box']}>
            {photoToken ? (
              <picture className={styles.card__imagea}>
                <img
                  className={styles.card__image}
                  alt="가게 이미지"
                  src={photoToken}
                />
                <source srcSet={defaultImage} />
              </picture>
            ) : (
              <div className={styles['card__empty-image']}>
                <NotFoundImageIcon />
                <div>등록된 사진이 없어요!</div>
              </div>
            )}
          </div>

          <div className={`${styles.card__description} ${styles.description}`}>
            <div className={styles.description__category}>{category}</div>
            <div className={styles.description__name}>{name}</div>
          </div>

          <div className={`${styles.card__cover} ${styles.cover}`}>
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
