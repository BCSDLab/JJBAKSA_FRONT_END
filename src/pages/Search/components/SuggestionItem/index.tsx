import { useLocation } from 'react-router-dom';

import { ReactComponent as DeleteIcon } from 'assets/svg/search/delete.svg';
import { ReactComponent as PinIcon } from 'assets/svg/search/pin.svg';
import useSearchForm from 'store/text';

import styles from './SuggestionItem.module.scss';

interface Props {
  item: string;
}

export default function SuggestionItem({ item }: Props) {
  const location = useLocation();
  const { setSearchForm } = useSearchForm(location.pathname);

  const handleClick = () => {
    setSearchForm((prevSearchForm) => ({
      ...prevSearchForm,
      submittedText: item,
      isEnter: true,
    }));
  };

  return (
    <>
      <button
        className={styles.suggestion}
        type="button"
        onClick={handleClick}
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
