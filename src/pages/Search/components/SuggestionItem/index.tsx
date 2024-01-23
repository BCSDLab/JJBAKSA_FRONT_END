import { ReactComponent as DeleteIcon } from 'assets/svg/search/delete.svg';
import { ReactComponent as PinIcon } from 'assets/svg/search/pin.svg';
import useSearchForm from 'store/text';

import styles from './SuggestionItem.module.scss';

interface Props {
  item: string;
}

export default function SuggestionItem({ item }: Props) {
  const { setSearchForm } = useSearchForm('/shop');

  const handleClick = () => {
    setSearchForm((prevSearchForm) => ({
      ...prevSearchForm,
      submittedText: item,
      isEnter: true,
    }));
  };

  return (
    <li className={styles.suggestion}>
      <button
        className={styles.suggestion__item}
        type="button"
        onClick={handleClick}
      >
        <PinIcon className={styles.suggestion__pin} />
        <div className={styles.suggestion__title}>
          {item}
        </div>
        <DeleteIcon className={styles.suggestion__delete} />
      </button>
    </li>
  );
}
