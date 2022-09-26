import { ReactComponent as LeftAngleBraketIcon } from 'assets/svg/angle-braket.svg';
import { ReactComponent as Picture } from 'assets/svg/picture.svg';
import { ReactComponent as Plus } from 'assets/svg/plus.svg';
import StarRating from 'components/StarRating';
import Wysiwyg, { WysiwygRef } from 'components/editor/Wysiwyg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import cn from 'utils/ts/classNames';
import styles from './TextEditor.module.scss';

interface TextEditorProps {
  shop: string | undefined;
}

function TextEditor({ shop }: TextEditorProps) {
  const [showTextTools, setShowTextTools] = useState(false);
  const [isShopExist, setIsShopExist] = useState(false);
  const [isRate, setIsRate] = useState(false);
  const navigate = useNavigate();
  const wysiwygRef = useRef<WysiwygRef>(null);

  useEffect(() => {
    if (shop === undefined) {
      setIsShopExist(false);
    } else {
      setIsShopExist(true);
    }
  }, [shop]);

  const textToolHandler = () => {
    setShowTextTools(!showTextTools);
  };
  const getShop = () => {
    // 여기서 Shop 정보를 가져온다.
    // Shop 정보가 가져와졌다는 가정하에 true를 전달.
    // 추가적으로 shop이름을 받아오는 로직 작성 필요.
    setIsShopExist(true);
  };
  const rating = () => {
    setIsRate(true);
  };

  return (
    <div className={cn({
      [styles.template]: true,
      [styles['template--active']]: isShopExist,
    })}
    >
      <div className={styles.header}>
        <LeftAngleBraketIcon type="button" className={styles['header__button--prev']} onClick={() => navigate(-1)} />
        { !isShopExist && <Plus type="button" className={styles['header__button--add']} onClick={getShop} /> }
        { isShopExist && <div className={styles.header__shopname}>{ shop }</div> }
        { isShopExist && <StarRating rating={rating} /> }
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
          disabled={!isRate && !isShopExist}
        >
          저장
        </button>
      </span>
    </div>
  );
}

export default TextEditor;
