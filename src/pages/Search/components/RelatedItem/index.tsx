import { ReactComponent as PointerIcon } from 'assets/svg/search/pointer.svg';
import useSearchForm from 'store/text';

import styles from './RelatedItem.module.scss';

interface Props {
  item: string;
}

export default function RelatedItem({ item }: Props) {
  const { setSearchForm } = useSearchForm('/shop');

  const handleClick = () => {
    setSearchForm((prevSearchForm) => ({
      ...prevSearchForm,
      submittedText: item,
      isEnter: true,
    }));
  };

  return (
    <button
      type="button"
      className={styles.suggestion__wrapper}
      onClick={handleClick}
    >
      <li className={styles.suggestion__item}>
        <div className={styles.suggestion__title}>
          <div className={styles.suggestion__icon}>
            <PointerIcon />
          </div>
          {item}
        </div>
      </li>
    </button>
  );
}
