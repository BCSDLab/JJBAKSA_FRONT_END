import cn from 'utils/ts/classNames';
import styles from 'pages/Search/components/RelatedSearches/RelatedSearches.module.scss';
import useSearchingMode from 'pages/Search/hooks/useSearchingMode';
import useFetchAutoComplete from 'pages/SearchDetails/hooks/useFetchAutoComplete';
import useBooleanState from 'utils/hooks/useBooleanState';
import RelatedItem from './components/RelatedItem';
import ToggleButton from './components/ToggleButton';

interface Props {
  text: string,
}

export default function RelatedSearches({ text }: Props) {
  const isSearching = useSearchingMode();
  const { query: auto } = useFetchAutoComplete(text ?? '');
  const [isActive, , , toggle] = useBooleanState(false);

  return (
    <div className={styles.search}>
      <ul className={cn({
        [styles['search-related-list']]: true,
        [styles['search-related-list--hidden']]: !isSearching || text === '',
      })}
      >
        <div className={styles['search-related-list__autoController']}>
          <div className={`${styles['search-related-list__autoButtonTitle']} ${isActive ? styles.active : ''}`}>
            자동완성
          </div>
          <div className={styles['search-related-list__toggleButton']}>
            <ToggleButton onClick={toggle} isActive={isActive} />
          </div>
        </div>
        {
          text === '' || !Array.isArray(auto)
            ? null
            : auto.filter((item: string) => item.includes(text))
              .map((item) => <RelatedItem item={item} key={item} />)
        }
      </ul>
    </div>
  );
}
