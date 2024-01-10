import defaultImage from 'assets/images/search/default-image.png';
import { ReactComponent as Clock } from 'assets/svg/common/clock.svg';
import { ReactComponent as Close } from 'assets/svg/common/close.svg';

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
      <div className={styles.container}>
        {!isMobile && <img alt="imageAlt" src={photoToken ?? defaultImage} className={styles.image} />}
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
    );
  } return null;
}
