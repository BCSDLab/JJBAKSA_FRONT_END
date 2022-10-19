import { ReactComponent as Trash } from 'assets/svg/trash.svg';
import { useRef, useState } from 'react';
import useOnClickOutside from 'utils/hooks/useOnClickOutside';
import styles from '../TextEditor.module.scss';

interface Props {
  value: string,
  removeImage: (value: string) => void,
}

export default function ImageItem({ value, removeImage }: Props) {
  const [buttonOpened, setButtonOpened] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(imageRef, () => setButtonOpened(false));

  return (
    <>
      { buttonOpened && (
        <button
          type="button"
          aria-label="trash"
          className={styles.imageContainer__button}
          onClick={() => removeImage(value)}
        >
          <Trash />
        </button>
      )}
      <input
        type="image"
        className={styles.imageContainer__image}
        src={value}
        alt="이미지"
        ref={imageRef}
        onClick={() => setButtonOpened(true)}
      />
    </>
  );
}
