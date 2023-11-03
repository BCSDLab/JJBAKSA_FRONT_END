import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import styles from './TextTruncation.module.scss';

export default function TextTruncation({ text }: { text: string }): JSX.Element {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing = textRef.current.scrollHeight > textRef.current.offsetHeight;
      setIsTruncated(isOverflowing);
    }
  }, [text]);

  return (
    <p className={styles.block__title} ref={textRef}>
      {text}
      {isTruncated && '...'}
    </p>
  );
}
