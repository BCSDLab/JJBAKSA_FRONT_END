import { ReactComponent as Plus } from 'assets/svg/post/plus.svg';
import { useRef } from 'react';
import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/classNames';
import Wysiwyg, { WysiwygType } from 'components/editor/Wysiwyg';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import StarRating from 'components/StarRating';
import AddImage from './AddImage';
// import SlideToolBox from './SlideToolBox';
import styles from './TextEditor.module.scss';

interface Props {
  shop: string | null;
  getShopname: () => string | null;
}

export default function TextEditor({ shop, getShopname }: Props) {
  const wysiwygRef = useRef<WysiwygType | null>(null);
  const [actived, active] = useBooleanState(false);
  const [opened, open, close] = useBooleanState(false);

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
      <title className={styles.box}>
        {shop == null ? (
          <div>
            <button
              type="button"
              className={styles['box__button--add']}
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
            <div className={styles.box__box}>
              <div className={styles.box__shopname}>{shop}</div>
              <div className={styles['box__sub-title']}>음식에 대한 별점을 매겨주세요.</div>
              <StarRating onClick={active} />
            </div>
          )}
      </title>
      <div
        className={cn({
          [styles.editor]: true,
          [styles['editor--withImage']]: opened,
        })}
      >
        <Wysiwyg ref={wysiwygRef} />
      </div>
      <span className={styles.item}>
        <span className={styles.item__tools}>
          <AddImage active={open} inActive={close} />
          {/* <SlideToolBox
            bold={() => wysiwygRef.current?.bold()}
            heading={() => wysiwygRef.current?.heading()}
            paragraph={() => wysiwygRef.current?.paragraph()}
            through={() => wysiwygRef.current?.through()}
          /> */}
        </span>
      </span>
    </div>
  );
}
