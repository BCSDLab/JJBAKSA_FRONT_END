import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  size: number;
}

function LoadingSpinner(props: LoadingSpinnerProps) {
  const { size } = props;
  return (
    <div className={styles['loading-wrapper']} style={{ height: size }}>
      <div className={styles['loading-div']} style={{ width: size, height: size }} />
      <div className={styles['loading-div']} style={{ width: size, height: size }} />
      <div className={styles['loading-div']} style={{ width: size, height: size }} />
      <div className={styles['loading-div']} style={{ width: size, height: size }} />
    </div>
  );
}

export default LoadingSpinner;
