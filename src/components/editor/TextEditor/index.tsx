import { ReactComponent as Plus } from 'assets/svg/post/plus.svg';
import cn from 'utils/ts/classNames';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import StarRating from 'components/StarRating';
import useBooleanState from 'utils/hooks/useBooleanState';
import AddImage from './AddImage';
// import SlideToolBox from './SlideToolBox';
import styles from './TextEditor.module.scss';

interface Props {
  shop: string | null;
  getShopname: () => string | null;
}

export default function TextEditor({ shop, getShopname }: Props) {
  const [actived, active] = useBooleanState(false);

  return (
    <div className={cn({
      [styles.template]: true,
      [styles['template--active']]: shop != null,
    })}
    >
      <header className={styles.header}>
        <div className={styles.header__button}>
          <PreviousButton />
        </div>
        <div className={styles.header__title}>
          리뷰하기
        </div>
        <button
          type="button"
          className={cn({
            [styles['header__save-button']]: true,
            [styles['haeader__save-button--active']]: actived,
          })}
          disabled={!actived && shop != null}
        >
          저장
        </button>
      </header>
      <title className={styles.heading}>
        {shop == null ? (
          <div>
            <button
              type="button"
              className={styles['heading__button--add']}
            // 추후 검색 링크로 이동하는 이벤트로 변경
            // 해당 검색 링크에서 특정 상점 선택 시 getShopname함수 호출
            // 값이 null에서 string으로 변하면서 제목과 별점 생성
              onClick={getShopname}
            >
              <Plus />
            </button>
          </div>
        )
          : (
            <div className={styles.heading__contents}>
              <div className={styles.heading__shopname}>{shop}</div>
              <div className={styles['heading__sub-title']}>음식에 대한 별점을 매겨주세요.</div>
              <StarRating onClick={active} />
            </div>
          )}
      </title>
      <div className={styles.item}>
        <div className={styles.item__tools}>
          <AddImage />
          {/* <SlideToolBox
            bold={() => wysiwygRef.current?.bold()}
            heading={() => wysiwygRef.current?.heading()}
            paragraph={() => wysiwygRef.current?.paragraph()}
            through={() => wysiwygRef.current?.through()}
          /> */}
        </div>
      </div>
    </div>
  );
}
