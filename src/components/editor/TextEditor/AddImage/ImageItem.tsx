import { ReactComponent as Trash } from 'assets/svg/post/trash.svg';
import { useRef } from 'react';
import useBooleanState from 'utils/hooks/useBooleanState';
import useOnClickOutside from 'utils/hooks/useOnClickOutside';
import styles from '../TextEditor.module.scss';

interface Props {
  value: string,
  onDelete: (value: string) => void,
}

export default function ImageItem({ value, onDelete }: Props) {
  const [opened, open, close] = useBooleanState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(imageRef, close);

  return (
    <>
      { opened && (
        <button
          type="button"
          aria-label="trash"
          className={styles['image-container__button']}
          onClick={() => onDelete(value)}
        >
          <Trash />
        </button>
      )}
      <input
        type="image"
        alt=""
        className={styles['image-container__image']}
        src={value}
        ref={imageRef}
        onClick={open}
      />
    </>
  );
}
