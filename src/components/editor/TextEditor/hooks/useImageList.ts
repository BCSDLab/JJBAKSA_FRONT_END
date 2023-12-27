import { useState } from 'react';

import { useSetReview } from 'store/review';
import makeToast from 'utils/ts/makeToast';

export default function useImageList() {
  const [imageList, setImageList] = useState<string[]>([]);
  const setReview = useSetReview();

  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const fileCount = files.length;
      const dataTransfer = new DataTransfer();
      for (let i = 0; i < fileCount; i += 1) {
        if (files[i].size > 1048576) {
          makeToast('error', '최대 1MB 이미지만 업로드 가능합니다.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === 'string') {
            setImageList((prev) => ([...prev, result]));
          }
        };
        reader.readAsDataURL(files[i]);
        dataTransfer.items.add(files[i]);
        setReview((prev) => ({
          ...prev,
          reviewImages: [...prev.reviewImages, files[i]],
        }));
      }
    }
  };

  const removeImage = (index: number) => {
    setImageList((prev) => {
      const newList = [...prev];
      newList.splice(index, 1);
      return newList;
    });
    setReview((prev) => ({
      ...prev,
      reviewImages: prev.reviewImages.filter((_, i) => i !== index),
    }));
  };

  return {
    imageList,
    setImageList,
    addImage,
    removeImage,
  };
}
