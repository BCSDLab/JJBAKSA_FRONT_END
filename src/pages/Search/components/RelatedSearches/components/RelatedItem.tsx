import { ReactComponent as PointerIcon } from 'assets/svg/search/pointer.svg';
import useSearchForm from 'store/text';

import styles from '../RelatedSearches.module.scss';

interface Props {
  item: string;
}

export default function RelatedItem({ item }: Props) {
  const { setSearchForm } = useSearchForm('/shops');

  const handleClick = () => {
    setSearchForm((prevSearchForm) => ({
      ...prevSearchForm,
      submittedText: item,
      isEnter: true,
    }));
  };

  return (
    <button type="button" className={styles['search-related-list__wrapper']} onClick={handleClick}>
      <li className={styles['search-related-list__item']}>
        <div className={styles['search-related-list__title']}>
          <div className={styles['search-related-list__icon']}>
            <PointerIcon />
          </div>
          {item}
        </div>
      </li>
    </button>
  );
}
