import AddImage from 'components/editor/TextEditor/AddImage/index';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import StarRating from 'components/StarRating';
import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/classNames';

import styles from './TextEditor.module.scss';

interface Props {
  shop: string;
  onSubmit: () => void;
}

export default function TextEditor({ shop, onSubmit }: Props) {
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
          onClick={onSubmit}
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
        <div className={styles.heading__contents}>
          <div className={styles.heading__shopname}>{shop}</div>
          <div className={styles['heading__sub-title']}>음식에 대한 별점을 매겨주세요.</div>
          <StarRating onClick={active} />
        </div>
      </title>
      <div className={styles.item}>
        <div className={styles.item__tools}>
          <AddImage />
        </div>
      </div>
    </div>
  );
}
