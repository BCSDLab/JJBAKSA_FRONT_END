import React, { ChangeEvent, useState } from 'react';

import { ReactComponent as Plus } from 'assets/svg/post/picture.svg';

function AddImageFile() {
  const [imageSrc, setImageSrc] = useState<string>();

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result as string);
        resolve();
      };
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      encodeFileToBase64(file);
    }
  };

  return (
    <main>
      <label htmlFor="image" aria-label="이미지 추가">
        <div>
          <Plus />
        </div>
        <input
          type="file"
          onChange={handleFileChange}
          id="image"
          multiple
        />
      </label>
      <div>
        {imageSrc && <img src={imageSrc} alt="preview-img" width="80" height="80" />}
      </div>
    </main>
  );
}

export default AddImageFile;
