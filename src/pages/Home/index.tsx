import Map from './components/Map';
import styles from './Home.module.scss';

export default function Home(): JSX.Element {
  return (
    <div className={styles.home}>
      <Map />
    </div>
  );
}
