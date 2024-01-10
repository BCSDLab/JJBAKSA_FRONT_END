import PreviousButton from 'components/PreviousButton/PreviousButton';

import styles from './PreviousBar.module.scss';

export default function PreviousBar() {
  return (
    <div className={styles.container}>
      <PreviousButton fallback="/notice" />
      공지사항
    </div>
  );
}
