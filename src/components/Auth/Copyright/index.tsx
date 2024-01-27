import styles from './Copyright.module.scss';

export default function Copyright(): JSX.Element {
  return (
    <div className={styles.copyright}>
      COPYRIGHT ⓒ
      {' '}
      { new Date().getFullYear() }
      {' '}
      BY BCSDLab ALL RIGHTS RESERVED.
    </div>
  );
}
