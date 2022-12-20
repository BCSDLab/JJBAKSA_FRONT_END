import styles from 'pages/SearchDetails/SearchDetails.module.scss';

export default function LoadingView() {
  return (
    <div className={styles.loading}>현재 위치에서 찾아보는 중이에요..</div>
  );
}
