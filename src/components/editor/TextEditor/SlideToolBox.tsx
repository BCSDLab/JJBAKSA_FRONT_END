import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/classNames';

import styles from './TextEditor.module.scss';

interface Props {
  bold: () => void,
  heading: () => void,
  paragraph: () => void,
  through: () => void,
}

export default function SlideToolBox({
  bold, heading, paragraph, through,
}: Props) {
  const [visible,,, toggle] = useBooleanState(false);
  return (
    <span
      className={cn({
        [styles['item__text-tools']]: true,
        [styles['item__text-tools--show']]: visible,
      })}
    >
      <div>
        <button
          type="button"
          className={cn({
            [styles.item__button]: true,
            [styles['item__button--tool']]: true,
          })}
          onClick={toggle}
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
          onClick={() => bold()}
        >
          B
        </button>
        <button
          type="button"
          className={cn({
            [styles['slide-tool-box__button']]: true,
            [styles['slide-tool-box__button--heading']]: true,
          })}
          onClick={() => heading()}
        >
          H
        </button>
        <button
          type="button"
          className={cn({
            [styles['slide-tool-box__button']]: true,
            [styles['slide-tool-box__button--paragraph']]: true,
          })}
          onClick={() => paragraph()}
        >
          H
        </button>
        <button
          type="button"
          className={cn({
            [styles['slide-tool-box__button']]: true,
            [styles['slide-tool-box__button--through']]: true,
          })}
          onClick={() => through()}
        >
          T
        </button>
      </span>
    </span>
  );
}
