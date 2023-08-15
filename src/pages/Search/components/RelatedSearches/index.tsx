import cn from 'utils/ts/classNames';
import styles from 'pages/Search/components/RelatedSearches/RelatedSearches.module.scss';
import suggestion from 'pages/Search/static/suggestion';
import useSearchingMode from 'pages/Search/hooks/useSearchingMode';
import RelatedItem from './components/RelatedItem';

interface Props {
  text: string,
}

export default function RelatedSearches({ text }: Props) {
  // console.log('related', text);
  const isSearching = useSearchingMode();
  return (
    <div className={styles.search}>
      <ul className={cn({
        [styles['search-related-list']]: true,
        [styles['search-related-list--hidden']]: !isSearching,
      })}
      >
        {text === '' ? null : suggestion.filter((item) => item.title.includes(text))
          .map((item) => <RelatedItem key={item.id} item={item} />)}
      </ul>
    </div>
  );
}
