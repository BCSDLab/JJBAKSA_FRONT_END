import styles from './Copyright.module.scss';

function Copyright(): JSX.Element {
  return (
    <div className={styles.copyright}>
      COPYRIGHT ⓒ&nbsp;
      {
        new Date().getFullYear()
      }
      &nbsp;BY BCSDLab ALL RIGHTS RESERVED.
    </div>
  );
}
export default Copyright;
