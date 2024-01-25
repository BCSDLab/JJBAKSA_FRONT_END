import { useRef } from 'react';

import styles from './Sentence.module.scss';

interface SentenceProps {
  subText: JSX.Element[];
}

export default function Sentence({ subText }: SentenceProps) {
  const textIndex = useRef(Math.floor(Math.random() * subText.length));
  const sentence = subText[textIndex.current];

  return (
    <h1 className={styles.sentence}>
      {sentence}
    </h1>
  );
}