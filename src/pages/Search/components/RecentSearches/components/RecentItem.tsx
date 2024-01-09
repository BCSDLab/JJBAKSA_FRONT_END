import defaultImage from 'assets/images/search/default-image.png';

import styles from './RecentItem.module.scss';

interface Props {
  photoToken: string | null,
  name: string,
  category: string,
}

export default function RecentItem({
  photoToken, name, category,
}: Props) {
  return (
    <div className={styles.container}>
      <img alt="imageAlt" src={photoToken ?? defaultImage} className={styles.image} />
      <div>{category}</div>
      <div>{name}</div>
    </div>
  );
}
