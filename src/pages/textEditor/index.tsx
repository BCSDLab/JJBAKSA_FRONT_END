import { ReactComponent as LeftAngleBraketIcon } from 'assets/svg/angle-braket.svg';
import { ReactComponent as Picture } from 'assets/svg/picture.svg';
import StarContainer from 'components/rating/StarContainer';
import { useState } from 'react';
import cn from 'utils/ts/classNames';
import styles from './TextEditor.module.scss';

function TextEditor(): JSX.Element {
  const [showTextTools, setShowTextTools] = useState(false);
  const [saveActive, setSaveActive] = useState(false);
  const textToolHandler = () => {
    setShowTextTools(!showTextTools);
  };
  const saveActiveHandler = () => {
    setSaveActive(!saveActive);
  };
  return (
    <div className={styles.template}>
      <div className={styles.header}>
        <LeftAngleBraketIcon type="button" className={styles.header__button} />
        <div className={styles.header__shopname}>여기에 가게명</div>
        <StarContainer />
      </div>
      <div className={styles.editor}>에디터가 들어갈 공간</div>
      <span className={styles.item}>
        <span className={styles.item__span}>
          <button type="button" className={styles.item__button}>
            <Picture />
          </button>
          <span
            className={cn({
              [styles['item__text-tools']]: true,
              [styles.show]: showTextTools,
            })}
          >
            <div>
              <button type="button" className={`${styles.item__button} ${styles.buttonT}`} onClick={textToolHandler}>T</button>
            </div>
            <div className={styles.item__span}>
              <button type="button" className={`${styles['item__button--onclick']} ${styles.buttonBold}`}>B</button>
              <button type="button" className={`${styles['item__button--onclick']} ${styles.button}`}>12</button>
              <button type="button" className={`${styles['item__button--onclick']} ${styles.buttonUnderline}`}>U</button>
              <button type="button" className={`${styles['item__button--onclick']} ${styles.buttonThrough}`}>T</button>
            </div>
          </span>
        </span>
        <button
          type="button"
          className={cn({
            [styles.save__button]: true,
            [styles.active]: saveActive,
          })}
          onClick={saveActiveHandler}
        >
          저장
        </button>
      </span>
    </div>
  );
}

export default TextEditor;
