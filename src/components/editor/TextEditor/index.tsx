import { ReactComponent as LeftAngleBraketIcon } from 'assets/svg/angle-braket.svg';
import { ReactComponent as Picture } from 'assets/svg/picture.svg';
import { ReactComponent as Plus } from 'assets/svg/plus.svg';
import StarRating from 'components/StarRating';
import Wysiwyg from 'components/editor/Wysiwyg';
import cn from 'utils/ts/classNames';
import useEditor from './hooks/useEditor';
import styles from './TextEditor.module.scss';

interface Props {
  shop: string | null;
  getShopname: () => string | null;
}

function TextEditor({ shop, getShopname }: Props) {
  const {
    showTextTools,
    isRate,
    navigate,
    wysiwygRef,
    textToolHandler,
    rating,
  } = useEditor();

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
              <StarRating onClick={rating} />
            </>
          )}
      </div>
      <div className={styles.editor}>
        <Wysiwyg ref={wysiwygRef} />
      </div>
      <span className={styles.item}>
        <span className={styles.item__tools}>
          <button type="button" className={styles.item__button} onClick={() => wysiwygRef.current?.addImg()}>
            <Picture />
          </button>
          <span
            className={cn({
              [styles['item__text-tools']]: true,
              [styles['item__text-tools--show']]: showTextTools,
            })}
          >
            <div>
              <button
                type="button"
                className={cn({
                  [styles.item__button]: true,
                  [styles['item__button--tool']]: true,
                })}
                onClick={textToolHandler}
              >
                T
              </button>
            </div>
            <span className={styles['slide-tool-box']}>
              <button
                type="button"
                className={cn({
                  [styles['slide-tool-box__button']]: true,
                  [styles['slide-tool-box__button--bold']]: true,
                })}
                onClick={() => wysiwygRef.current?.bold()}
              >
                B
              </button>
              <button
                type="button"
                className={cn({
                  [styles['slide-tool-box__button']]: true,
                  [styles['slide-tool-box__button--heading']]: true,
                })}
                onClick={() => wysiwygRef.current?.heading()}
              >
                H
              </button>
              <button
                type="button"
                className={cn({
                  [styles['slide-tool-box__button']]: true,
                  [styles['slide-tool-box__button--paragraph']]: true,
                })}
                onClick={() => wysiwygRef.current?.paragraph()}
              >
                H
              </button>
              <button
                type="button"
                className={cn({
                  [styles['slide-tool-box__button']]: true,
                  [styles['slide-tool-box__button--through']]: true,
                })}
                onClick={() => wysiwygRef.current?.through()}
              >
                T
              </button>
            </span>
          </span>
        </span>
        <button
          type="button"
          className={cn({
            [styles['save-button']]: true,
            [styles['save-button--active']]: isRate,
          })}
          disabled={!isRate && shop != null}
        >
          저장
        </button>
      </span>
    </div>
  );
}

export default TextEditor;
