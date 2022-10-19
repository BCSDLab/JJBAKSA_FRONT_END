import { Dispatch, SetStateAction, useState } from 'react';
import ImageApi from '../api/ImageApi';

interface ReturnType {
  imageList: string[] | null,
  setImageList: Dispatch<SetStateAction<string[] | null>>,
  addImage: () => void,
  removeImage: (value: string) => void,
}

export default function useImageList(): ReturnType {
  const { data, refetch } = ImageApi();
  const [imageList, setImageList] = useState<string[] | null>(null);
  const addImage = () => {
    refetch();
    if (imageList === null) setImageList([data?.data.message]);
    else setImageList((prev) => prev && [...prev, data?.data.message]);
  };
  const removeImage = (value: string) => {
    setImageList((prev) => prev && prev.filter((item) => item !== value));
  };
  return {
    imageList, setImageList, addImage, removeImage,
  };
}
