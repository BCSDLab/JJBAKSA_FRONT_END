import { ReactComponent as Picture } from 'assets/svg/picture.svg';
import { useEffect } from 'react';
import styles from '../TextEditor.module.scss';
import useImageList from '../hooks/useImageList';
import ImageItem from './ImageItem';

interface Props {
  active: () => void,
  inActive: () => void,
}

function AddImage({ active, inActive }: Props) {
  const { imageList, addImage, removeImage } = useImageList();
  useEffect(() => {
    if (imageList === null || imageList.length === 0) inActive();
    else active();
  }, [imageList, active, inActive]);

  return (
    <>
      <button
        type="button"
        className={styles.item__button}
        onClick={addImage}
      >
        <Picture />
      </button>
      <span className={styles.imageContainer}>
        { imageList?.map((value) => (
          <div key={value} className={styles.imageContainer__item}>
            <ImageItem value={value} removeImage={removeImage} />
          </div>
        ))}
      </span>
    </>
  );
}

export default AddImage;
