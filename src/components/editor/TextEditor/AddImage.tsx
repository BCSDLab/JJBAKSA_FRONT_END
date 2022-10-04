import { ReactComponent as Picture } from 'assets/svg/picture.svg';
import { ReactComponent as Trash } from 'assets/svg/trash.svg';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styles from './TextEditor.module.scss';

interface ImageInfo {
  url: string,
  showRemoveButton : boolean,
}

function AddImage() {
  const [imageUrlList, setImageUrlList] = useState<ImageInfo[] | null>(null);
  // 현재는 랜덤 이미지를 받아오는 api를 담고 있습니다.
  const {
    isLoading, isError, data, refetch,
  } = useQuery('getImage', () => axios.get('https://dog.ceo/api/breeds/image/random'), {
    refetchOnWindowFocus: false,
    retry: 0,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  const addPicture = () => {
    refetch();
    if (imageUrlList === null) {
      setImageUrlList([{ url: data?.data.message, showRemoveButton: false }]);
    }
    if (imageUrlList !== null) {
      setImageUrlList((prev) => (
        prev && [...prev, { url: data?.data.message, showRemoveButton: false }]
      ));
    }
  };

  const showRemoveButton = (info: ImageInfo, index: number) => {
    setImageUrlList((prev) => (
      prev && prev.map((item, i) => (
        index === i ? { url: info.url, showRemoveButton: !info.showRemoveButton } : item))
    ));
  };
  const removeImage = (info: ImageInfo) => {
    setImageUrlList((prev) => prev && prev.filter((item) => item.url !== info.url));
  };
  return (
    <>
      <button type="button" className={styles.item__button} onClick={addPicture}>
        <Picture />
      </button>
      <span className={styles.imageContainer}>
        { imageUrlList?.map((info, index) => (
          <div key={info.url} className={styles.imageContainer_item}>
            { info.showRemoveButton && <button type="button" aria-label="trash" className={styles.imageContainer_button} onClick={() => removeImage(info)}><Trash /></button> }
            <input className={styles.imageContainer_image} type="image" src={info.url} alt="이미지" onClick={() => showRemoveButton(info, index)} />
          </div>
        ))}
      </span>
    </>
  );
}

export default AddImage;
