import AddImage from 'components/editor/TextEditor/AddImage/index';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import StarRating from 'components/StarRating';
import useBooleanState from 'utils/hooks/useBooleanState';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cn from 'utils/ts/classNames';

import styles from './TextEditor.module.scss';

interface Props {
  shop: string;
  onSubmit: () => void;
}

export default function TextEditor({ shop, onSubmit }: Props) {
  const { isMobile } = useMediaQuery();
  const [actived, active] = useBooleanState(false);

  return (
    <div className={cn({
      [styles.template]: true,
      [styles['template--active']]: shop != null,
    })}
    >
      {isMobile && (
      <header className={styles.header}>
        <div className={styles.header__button}>
          <PreviousButton />
        </div>
      </header>
      )}
      <title className={styles.heading}>
        <div className={styles.heading__contents}>
          <span className={styles['heading__title--shop']}>{shop}</span>
          <span className={styles.heading__title}> 어땠나요?</span>
          <div className={styles.heading__subtitle}>음식에 대한 별점을 매겨주세요.</div>
          <StarRating onClick={active} />
        </div>
      </title>
      <div className={styles.item}>
        <div className={styles.item__tools}>
          <AddImage />
        </div>
      </div>
      <div className={styles['header__button-wrap']}>
        <button
          type="button"
          onClick={onSubmit}
          className={cn({
            [styles['header__save-button']]: true,
            [styles['header__save-button--active']]: actived,
          })}
          disabled={!actived && shop != null}
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
