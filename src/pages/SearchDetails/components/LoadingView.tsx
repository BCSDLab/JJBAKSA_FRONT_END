import styles from 'pages/SearchDetails/SearchDetails.module.scss';

export default function LoadingView() {
  return (
    <div className={styles['search__loading-view']}>현재 위치에서 찾아보는 중이에요..</div>
  );
}
