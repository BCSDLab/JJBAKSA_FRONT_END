import { Dispatch, SetStateAction, useState } from 'react';

interface ReturnType {
  imageList: string[] | null;
  setImageList: Dispatch<SetStateAction<string[] | null>>;
  addImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (value: string) => void;
}

export default function useImageList(): ReturnType {
  const [imageList, setImageList] = useState<string[] | null>(null);

  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const fileArray: string[] = [];
      const fileCount = files.length;

      for (let i = 0; i < fileCount; i += 1) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === 'string') {
            fileArray.push(result);
            if (fileArray.length === fileCount) {
              setImageList((prev) => (prev ? [...prev, ...fileArray] : fileArray));
            }
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const removeImage = (value: string) => {
    setImageList((prev) => prev?.filter((item) => item !== value) || null);
  };

  return {
    imageList,
    setImageList,
    addImage,
    removeImage,
  };
}
