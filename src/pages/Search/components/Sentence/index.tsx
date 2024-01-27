import { useRef } from 'react';

import styles from './Sentence.module.scss';

interface SentenceProps {
  className: string;
  subtext: JSX.Element[];
}

export default function Sentence({ className, subtext }: SentenceProps) {
  const textIndex = useRef(Math.floor(Math.random() * subtext.length));
  const sentence = subtext[textIndex.current];

  return (
    <div className={className}>
      <h1 className={styles.sentence}>{sentence}</h1>
    </div>
  );
}
