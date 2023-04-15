import styles from './AuthDetail.module.scss';

interface Props {
  name: string,
  first: string,
  second: string
}

export default function AuthDetail({ name, first, second }: Props) {
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
