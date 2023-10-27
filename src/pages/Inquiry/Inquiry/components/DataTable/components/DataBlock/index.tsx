import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import cn from 'utils/ts/classNames';
import { ReactComponent as Arrow } from 'assets/svg/common/arrow.svg';
import { InquiryContent } from 'api/inquiry/entity';
import styles from './DataBlock.module.scss';

function ClampText({ text }: { text: string }): JSX.Element {
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing = textRef.current.scrollHeight > textRef.current.offsetHeight;
      setIsClamped(isOverflowing);
    }
  }, [text]);

  return (
    <p className={styles.body__title} ref={textRef}>
      {text}
      {isClamped && '...'}
    </p>
  );
}

function Answer({ text }: { text: string }): JSX.Element {
  return (
    <div className={styles.answer}>
      {text ? (
        <p className={styles['answer--answered']}>
          {text}
        </p>
      ) : (
        <p className={styles['answer--no-answered']}>
          아직 답변이 없네요. 조금만 기다려주세요!
        </p>
      )}
    </div>
  );
}

interface Props {
  isExpanded: boolean,
  content: InquiryContent,
}

export default function DataBlock({ isExpanded, content }: Props): JSX.Element {
  return (
    <div
      className={cn({
        [styles.body]: true,
        [styles['body--expanded']]: isExpanded,
      })}
    >
      <ClampText text={content.title} />

      <p className={styles.body__info}>
        {new Date(content.createdAt).toLocaleDateString()}
        |
        {content.createdBy}
      </p>

      <Arrow
        className={cn({
          [styles.body__expander]: true,
          [styles['body__expander--expanded']]: isExpanded,
        })}
      />

      {isExpanded && (
        <Answer text={content.answer} />
      )}
    </div>
  );
}
