import { ReactComponent as Picture } from 'assets/svg/post/picture.svg';
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
      <div className={styles['image-container']}>
        { imageList?.map((value) => (
          <div key={value} className={styles['image-container__item']}>
            <ImageItem value={value} onDelete={removeImage} />
          </div>
        ))}
      </div>
    </>
  );
}

export default AddImage;