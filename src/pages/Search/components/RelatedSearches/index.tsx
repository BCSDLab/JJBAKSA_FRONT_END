import cn from 'utils/ts/classNames';
import styles from 'pages/Search/components/RelatedSearches/RelatedSearches.module.scss';
import MODE from 'pages/Search/static/mode';
import suggestion from 'pages/Search/static/suggestion';
import RelatedItem from './components/RelatedItem';

interface Props {
  mode: string,
  text: string,
}

export default function RelatedSearches({ mode, text }: Props) {
  return (
    <div className={styles.search}>
      <ul className={cn({
        [styles['search-related-item']]: true,
        [styles['search-related-item--hidden']]: mode === MODE.trending,
      })}
      >
        {text === '' ? null : suggestion.filter((item) => item.title.includes(text))
          .map((item) => <RelatedItem key={item.id} item={item} />)}
      </ul>
    </div>
  );
}
