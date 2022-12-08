import cn from 'utils/ts/classNames';
import styles from 'pages/Search/Search.module.scss';
import MODE from 'pages/Search/static/mode';
import suggestion from 'pages/Search/static/suggestion';
import RelatedItem from './RelatedItem';

interface Props {
  mode: string,
  text: string,
}

function RelatedSearches({ mode, text }: Props) {
  return (
    <div className={styles.search}>
      <ul className={cn({
        [styles['search-query-list']]: true,
        [styles['search-query-list--hidden']]: mode === MODE.trending,
      })}
      >
        {text === '' ? null : suggestion.map((item) => (
          <RelatedItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default RelatedSearches;
