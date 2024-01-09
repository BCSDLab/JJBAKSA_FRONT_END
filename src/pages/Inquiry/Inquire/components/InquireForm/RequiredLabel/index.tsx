import styles from './RequiredLabel.module.scss';

interface RequiredLabelProps {
  text: string;
}

export default function RequiredLabel({ text }: RequiredLabelProps): JSX.Element {
  return (
    <div className={styles.box}>
      <div className={styles.text}>
        {text}
      </div>
      <div className={styles.indicator}>
        <span className={styles.circle} />
      </div>
    </div>
  );
}
