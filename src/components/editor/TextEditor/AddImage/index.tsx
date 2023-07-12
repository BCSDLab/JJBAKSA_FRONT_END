import { ReactComponent as Picture } from 'assets/svg/post/picture.svg';
import { useEffect, useRef } from 'react';
import Wysiwyg, { WysiwygType } from 'components/editor/Wysiwyg';
import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/classNames';
import styles from './AddImage.module.scss';
import useImageList from '../hooks/useImageList';
import ImageItem from './ImageItem';

function AddImage() {
  const { imageList, addImage, removeImage } = useImageList();
  const wysiwygRef = useRef<WysiwygType | null>(null);
  const [opened, active, inActive] = useBooleanState(false);
  useEffect(() => {
    if (imageList === null || imageList.length === 0) inActive();
    else active();
  }, [imageList, active, inActive]);

  return (
    <>
      <div className={styles.container}>
        { imageList?.map((value) => (
          <div key={value} className={styles.container__item}>
            <ImageItem value={value} onDelete={removeImage} />
          </div>
        ))}
      </div>
      <div
        className={cn({
          [styles.editor]: true,
          [styles['editor--withImage']]: opened,
        })}
      >
        <Wysiwyg ref={wysiwygRef} />
      </div>
      <div className={styles['button-container']}>
        <label htmlFor="image">
          <div className={styles['addImage-button']}>
            <Picture />
          </div>
          <input
            type="file"
            onChange={addImage}
            id="image"
            className={styles.input}
            multiple
            accept="image/jpeg,image/gif,image/png"
          />
        </label>
      </div>
    </>
  );
}

export default AddImage;
