import styles from './AuthDetail.module.scss';

export default function AuthDetail({ name }: { name :string }) {
  return (
    <div className={styles.detail}>
      <div className={styles.detail__title}>{name}</div>
      <div className={styles.detail__text}>{'쩝쩝박사의 서비스를 이용하려면\n로그인하세요.'}</div>
    </div>
  );
}
