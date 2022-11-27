import { ReactComponent as Picture } from 'assets/svg/post/picture.svg';
import { ReactComponent as Trash } from 'assets/svg/post/trash.svg';
import { useEffect } from 'react';
import styles from './TextEditor.module.scss';
import useImageList from './hooks/useImageList';
import useBooleanStateList from './hooks/useBooleanStateList';

function AddImage({ active, inActive }: { active: () => void, inActive: () => void }) {
  const { imageList, addImage, removeImage } = useImageList();
  const isShowButtons = useBooleanStateList();

  useEffect(() => {
    if (imageList === null || imageList.length === 0) inActive();
    else active();
  }, [imageList, active, inActive]);

  return (
    <>
      <button
        type="button"
        className={styles.item__button}
        onClick={() => {
          addImage();
          isShowButtons.pushState(false);
        }}
      >
        <Picture />
      </button>
      <span className={styles.imageContainer}>
        { imageList?.map((value, index) => (
          <div key={value} className={styles.imageContainer_item}>
            { isShowButtons?.getState(index) && (
            <button
              type="button"
              aria-label="trash"
              className={styles.imageContainer_button}
              onClick={() => {
                removeImage(value);
                isShowButtons.removeState(true);
              }}
            >
              <Trash />
            </button>
            )}
            <input
              type="image"
              className={styles.imageContainer_image}
              src={value}
              alt="이미지"
              onClick={() => isShowButtons.onlyOneTruthHandler(index)}
            />
          </div>
        ))}
      </span>
    </>
  );
}

export default AddImage;
