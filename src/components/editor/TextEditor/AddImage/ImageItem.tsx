import { useRef } from 'react';

import { ReactComponent as Trash } from 'assets/svg/post/cancel.svg';

import styles from './AddImage.module.scss';

interface Props {
  value: string,
  index: number,
  onDelete: (index: number) => void,
}

export default function ImageItem({ value, onDelete, index }: Props) {
  const imageRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <button
        type="button"
        aria-label="trash"
        className={styles.container__button}
        onClick={() => onDelete(index)}
      >
        <Trash />
      </button>
      <input
        type="image"
        alt=""
        className={styles.container__image}
        src={value}
        ref={imageRef}
      />
    </div>
  );
}
