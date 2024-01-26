import { Link } from 'react-router-dom';

import { ReactComponent as Clock } from 'assets/svg/common/clock.svg';
import { ReactComponent as Close } from 'assets/svg/common/close.svg';
import defaultImage from 'assets/svg/common/favicon.svg';
import { ReactComponent as NotFoundImageIcon } from 'assets/svg/shop/not-found.svg';

import styles from './RecentItem.module.scss';

interface Props {
  photoToken: string | null,
  name: string,
  category: string,
  placeId: string,
  index: number,
  isMobile: boolean,
  deleteItem: (x: string) => void
}

export default function RecentItem({
  photoToken, name, category, deleteItem, placeId, index, isMobile,
}: Props) {
  if (index < 5) {
    return (
      <Link to={`/shop/${placeId}`} state={{ placeId }} className={styles.item}>
        <div className={styles.container}>
          {!isMobile && photoToken ? (
            <picture>
              <source srcSet={defaultImage} />
              <img alt="imageAlt" src={photoToken} className={styles.image} />
            </picture>
          ) : (
            <div className={styles['empty-image']}>
              <NotFoundImageIcon />
              <div>등록된 사진이 없어요!</div>
            </div>
          )}
          <div className={styles.description}>
            {isMobile ? <Clock /> : <div className={styles.description__category}>{category}</div>}
            <div className={styles.description__name}>{name}</div>
          </div>
          {isMobile ? <button className={styles.delete} type="button" onClick={() => deleteItem(placeId)}>x</button> : (
            <div className={styles.cover}>
              <Close onClick={() => deleteItem(placeId)} className={styles.cover__delete} />
            </div>
          )}
        </div>
      </Link>
    );
  } return null;
}
