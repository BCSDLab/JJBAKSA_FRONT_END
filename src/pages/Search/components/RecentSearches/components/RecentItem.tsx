import defaultImage from 'assets/images/search/default-image.png';
import { ReactComponent as Close } from 'assets/svg/common/close.svg';

import styles from './RecentItem.module.scss';

interface Props {
  photoToken: string | null,
  name: string,
  category: string,
  placeId: string,
  deleteItem: (x: string) => void
}

export default function RecentItem({
  photoToken, name, category, deleteItem, placeId,
}: Props) {
  return (
    <div className={styles.container}>
      <img alt="imageAlt" src={photoToken ?? defaultImage} className={styles.image} />
      <div className={styles.description}>
        <div className={styles.description__category}>{category}</div>
        <div className={styles.description__name}>{name}</div>
      </div>
      <div className={styles.cover}>
        <Close onClick={() => deleteItem(placeId)} className={styles.cover__delete} />
      </div>
    </div>
  );
}
