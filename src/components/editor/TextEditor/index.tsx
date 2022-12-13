import { ReactComponent as LeftAngleBraketIcon } from 'assets/svg/common/angle-braket.svg';
import { ReactComponent as Plus } from 'assets/svg/post/plus.svg';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useBoolean from 'utils/hooks/useBoolean';
import cn from 'utils/ts/classNames';
import Wysiwyg, { WysiwygType } from 'components/editor/Wysiwyg';
import StarRating from 'components/StarRating';
import AddImage from './AddImage';
import SlideToolBox from './SlideToolBox';
import styles from './TextEditor.module.scss';

interface Props {
  shop: string | null;
  getShopname: () => string | null;
}

export default function TextEditor({ shop, getShopname }: Props) {
  const wysiwygRef = useRef<WysiwygType | null>(null);
  const navigate = useNavigate();
  const isSaveActive = useBoolean(false);
  const isAddImageActive = useBoolean(false);

  return (
    <div className={cn({
      [styles.template]: true,
      [styles['template--active']]: shop != null,
    })}
    >
      <div className={styles.header}>
        <LeftAngleBraketIcon type="button" className={styles['header__button--prev']} onClick={() => navigate(-1)} />
        { shop == null ? (
          <Plus
            type="button"
            className={styles['header__button--add']}
            // 추후 검색 링크로 이동하는 이벤트로 변경
            // 해당 검색 링크에서 특정 상점 선택 시 getShopname함수 호출
            // 값이 null에서 string으로 변하면서 제목과 별점 생성
            onClick={getShopname}
          />
        )
          : (
            <>
              <div className={styles.header__shopname}>{ shop }</div>
              <StarRating onClick={isSaveActive.setTrue} />
            </>
          )}
      </div>
      <div className={cn({
        [styles.editor]: true,
        [styles['editor--withImage']]: isAddImageActive.value,
      })}
      >
        <Wysiwyg ref={wysiwygRef} />
      </div>
      <span className={styles.item}>
        <span className={styles.item__tools}>
          <AddImage active={isAddImageActive.setTrue} inActive={isAddImageActive.setFalse} />
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
            [styles['save-button--active']]: isSaveActive.value,
          })}
          disabled={!isSaveActive.value && shop != null}
        >
          저장
        </button>
      </span>
    </div>
  );
}
