import { ReactComponent as Picture } from 'assets/svg/post/picture.svg';
import { useEffect } from 'react';
import styles from './AddImage.module.scss';
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
    console.log('여기서 처음 imageList 값 전달', imageList);
  }, [imageList, active, inActive]);

  return (
    <>
      <label htmlFor="image">
        <div className={styles['image-box']}>
          <div className={styles.imageButton}>
            <Picture />
          </div>
        </div>
        <input
          type="file"
          onChange={addImage}
          id="image"
          className={styles.input}
          multiple
          ref="upload"
        />
      </label>
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
