import { ReactComponent as DeleteIcon } from 'assets/svg/search/delete.svg';
import { ReactComponent as PinIcon } from 'assets/svg/search/pin.svg';

import styles from './SuggestionItem.module.scss';

interface Props {
  item: string;
}

export default function SuggestionItem({ item }: Props) {
  return (
    <>
      <button
        className={styles.suggestion}
        type="button"
      >
        <PinIcon className={styles.suggestion__pin} />
        <div className={styles.suggestion__title}>
          {item}
        </div>
      </button>
      <DeleteIcon className={styles.suggestion__delete} />
    </>
  );
}
