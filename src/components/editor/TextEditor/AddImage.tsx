import { ReactComponent as Picture } from 'assets/svg/picture.svg';
import styles from './TextEditor.module.scss';

function AddImage() {
  return (
    <button type="button" className={styles.item__button}>
      <Picture />
    </button>
  );
}

export default AddImage;
