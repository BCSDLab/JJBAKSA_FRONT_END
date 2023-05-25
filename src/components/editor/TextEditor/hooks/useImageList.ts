import { Dispatch, SetStateAction, useState } from 'react';

interface ReturnType {
  imageList: string[] | null,
  setImageList: Dispatch<SetStateAction<string[] | null>>,
  addImage: () => void,
  removeImage: (value: string) => void,
}

export default function useImageList(): ReturnType {
  const [imageList, setImageList] = useState<string[] | null>(null);
  const addImage = () => {
    if (imageList === null) setImageList([]);
    else setImageList((prev) => prev && [...prev]);
    // refetch();
  };
  const removeImage = (value: string) => {
    setImageList((prev) => prev && prev.filter((item) => item !== value));
  };
  return {
    imageList, setImageList, addImage, removeImage,
  };
}
