import { patchDefaultImage, patchProfileImage } from 'api/mypage';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useChangeProfile = () => {
  const [image, setImage] = useState<FormData | null>(null);
  const [previewUrl, setUrl] = useState<string | null>(null);
  // const [nickname, setNickname] = useState(nickname);
  const { isError: imageError, data: imageResponse, refetch: imageRefetch } = useQuery(['changeImage', image], () => patchProfileImage(image), { enabled: false });
  const { refetch: defaultRefetch } = useQuery(['changeImage', image], () => patchDefaultImage(), { enabled: false });
  // const { isError: nicknameError, data: nicknameResponse, refetch: nicknameRefetch
  const getImageUrl = (file:Blob) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files) {
      const imageFile = e.target.files[0];
      formData.append('profile', imageFile);
      setImage(formData);
      getImageUrl(e.target.files[0]);
    }
  };

  const onClick = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image) {
      imageRefetch();
    } else {
      defaultRefetch();
    }
  };

  useEffect(() => {
    if (imageResponse) {
      window.location.reload();
    }
  }, [imageResponse]);

  return {
    onChange, imageResponse, imageError, onClick, previewUrl,
  };
};

export default useChangeProfile;
