import { ReactComponent as Plus } from 'assets/svg/plus.svg';
import { useRef } from 'react';
import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/classNames';
import Wysiwyg, { WysiwygType } from 'components/editor/Wysiwyg';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import StarRating from 'components/StarRating';
import AddImage from './AddImage/index';
import SlideToolBox from './SlideToolBox';
import styles from './TextEditor.module.scss';

interface Props {
  shop: string | null;
  getShopname: () => string | null;
}

function TextEditor({ shop, getShopname }: Props) {
  const wysiwygRef = useRef<WysiwygType | null>(null);
  const [actived, active] = useBooleanState(false);
  const [opened, open, close] = useBooleanState(false);

  return (
    <div className={cn({
      [styles.template]: true,
      [styles['template--active']]: shop != null,
    })}
    >
      <div className={styles.header}>
        <div className={styles['header__button--prev']}>
          <PreviousButton />
        </div>
        { shop == null ? (
          <button
            type="button"
            className={styles['header__button--add']}
            // 추후 검색 링크로 이동하는 이벤트로 변경
            // 해당 검색 링크에서 특정 상점 선택 시 getShopname함수 호출
            // 값이 null에서 string으로 변하면서 제목과 별점 생성
            onClick={getShopname}
          >
            <Plus />
          </button>
        )
          : (
            <>
              <div className={styles.header__shopname}>{ shop }</div>
              <StarRating onClick={active} />
            </>
          )}
      </div>
      <div className={cn({
        [styles.editor]: true,
        [styles['editor--withImage']]: opened,
      })}
      >
        <Wysiwyg ref={wysiwygRef} />
      </div>
      <span className={styles.item}>
        <span className={styles.item__tools}>
          <AddImage active={open} inActive={close} />
          <SlideToolBox
            bold={() => wysiwygRef.current?.bold()}
            heading={() => wysiwygRef.current?.heading()}
            paragraph={() => wysiwygRef.current?.paragraph()}
            through={() => wysiwygRef.current?.through()}
          />
        </span>
        <button
          type="button"
          className={cn({
            [styles['save-button']]: true,
            [styles['save-button--active']]: actived,
          })}
          disabled={!actived && shop != null}
        >
          저장
        </button>
      </span>
    </div>
  );
}

export default TextEditor;
