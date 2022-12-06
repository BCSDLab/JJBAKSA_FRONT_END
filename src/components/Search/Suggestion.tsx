import cn from 'utils/ts/classNames';
import styles from 'pages/Search/Search.module.scss';
import MODE from 'components/Search/static/mode';
import suggestion from 'components/Search/static/suggestion';
import SuggestionItem from './SuggestionItem';

interface Props {
  mode: string,
  text: string,
}

function Suggestion({ mode, text }: Props) {
  return (
    <div className={styles.search}>
      <ul className={cn({
        [styles['search-query-list']]: true,
        [styles['search-query-list--hidden']]: mode === MODE.trending,
      })}
      >
        {text === '' ? null : suggestion.map((item) => (
          <SuggestionItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default Suggestion;
