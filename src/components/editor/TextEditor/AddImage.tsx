import { ReactComponent as Picture } from 'assets/svg/picture.svg';
import { ReactComponent as Trash } from 'assets/svg/trash.svg';
import { useEffect } from 'react';
import styles from './TextEditor.module.scss';
import useImageList from './hooks/useImageList';
import useBooleanStateList from './hooks/useBooleanStateList';

function AddImage({ active, inActive }: { active: () => void, inActive: () => void }) {
  const { imageList, addImage, removeImage } = useImageList();
  const {
    booleanStateList, onlyOneTruthHandler, pushBooleanState, removeBooleanState,
  } = useBooleanStateList();

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
          pushBooleanState(false);
        }}
      >
        <Picture />
      </button>
      <span className={styles.imageContainer}>
        { imageList?.map((value, index) => (
          <div key={value} className={styles.imageContainer_item}>
            { booleanStateList && booleanStateList[index] && (
            <button
              type="button"
              aria-label="trash"
              className={styles.imageContainer_button}
              onClick={() => {
                removeImage(value);
                removeBooleanState(true);
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
              onClick={() => onlyOneTruthHandler(index)}
            />
          </div>
        ))}
      </span>
    </>
  );
}

export default AddImage;
