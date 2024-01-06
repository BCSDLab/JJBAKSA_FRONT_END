import { useRef } from 'react';

import { ReactComponent as Picture } from 'assets/svg/post/picture.svg';
import ImageItem from 'components/editor/TextEditor/AddImage/ImageItem';
import useImageList from 'components/editor/TextEditor/hooks/useImageList';
import Wysiwyg, { WysiwygType } from 'components/editor/Wysiwyg';
import cn from 'utils/ts/classNames';

import styles from './AddImage.module.scss';

function AddImage() {
  const { imageList, addImage, removeImage } = useImageList();
  const wysiwygRef = useRef<WysiwygType | null>(null);

  return (
    <div>
      <div className={styles.container}>
        {imageList.map((value, index) => (
          <div key={value} className={styles.container__item}>
            <ImageItem value={value} onDelete={removeImage} index={index} />
          </div>
        ))}
      </div>
      <div
        className={cn({
          [styles.editor]: true,
          [styles['editor--with-image']]: imageList.length > 0,
        })}
      >
        <Wysiwyg ref={wysiwygRef} />
      </div>
      <div className={styles['button-container']}>
        <label htmlFor="image" className={styles['editor__add-image']} aria-label="이미지 추가">
          <Picture />
          <input
            type="file"
            onChange={addImage}
            id="image"
            multiple
            accept="image/jpeg,image/gif,image/png"
          />
        </label>
      </div>
    </div>
  );
}

export default AddImage;
