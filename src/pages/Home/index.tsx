import styles from './Home.module.scss';
import Map from './components/Map/index';

export default function Home(): JSX.Element {
  return (
    <div className={styles.home}>
      <Map />
    </div>
  );
}
