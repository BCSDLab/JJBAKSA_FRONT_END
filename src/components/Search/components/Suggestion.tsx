import cn from 'utils/ts/classNames';
import styles from 'pages/Search/Search.module.scss';
import MODE from '../static/mode';
import SuggestionItem from './SuggestionItem';
import suggestion from '../static/suggestion';

function Suggestion({ mode, list, text } : any) {
  return (
    <div className={styles.search}>
      <ul className={cn({
        [styles['search-query-list']]: true,
        [styles['search-query-list--hidden']]: mode === MODE.trending,
      })}
      >
        {/* 이 부분은 검색창 리스트 필터링 확인을 위해서 임의로 목업 데이터 사용 */}
        {list?.filter((item: any) => item.title.includes(text)).length === 0
        && (
        <div className={styles['search-query-list__text--not-found']}>
          해당
          {` ${text} `}
          관련 음식점/게시물을 찾을 수 없습니다.
        </div>
        )}
        {text === '' ? null : suggestion.map((item : any) => (
          <SuggestionItem item={item} />
        ))}
      </ul>
    </div>
  );
}

export default Suggestion;
