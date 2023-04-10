import styles from './AuthDetail.module.scss';

export default function AuthDetail({ name, first, second }:
{ name :string, first:string, second:string }) {
  return (
    <div className={styles.detail}>
      <div className={styles.detail__title}>{name}</div>
      <div className={styles.detail__text}>
        {first}
        <br />
        {second}
      </div>
    </div>
  );
}
