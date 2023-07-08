import { ReactComponent as Trash } from 'assets/svg/post/cancel.svg';
import { useRef } from 'react';
import styles from './AddImage.module.scss';

interface Props {
  value: string,
  onDelete: (value: string) => void,
}

export default function ImageItem({ value, onDelete }: Props) {
  const imageRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        aria-label="trash"
        className={styles['image-container__button']}
        onClick={() => onDelete(value)}
      >
        <Trash />
      </button>
      <input
        type="image"
        alt=""
        className={styles['image-container__image']}
        src={value}
        ref={imageRef}
      />
    </>
  );
}
