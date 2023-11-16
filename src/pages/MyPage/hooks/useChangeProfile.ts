import { patchProfileImage } from 'api/mypage';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useChangeProfile = () => {
  const [image, setImage] = useState<FormData | null>(null);
  const [previewUrl, setUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const changeImage = useMutation({
    mutationFn: () => patchProfileImage(image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
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
  const onClick = () => {
    if (image) {
      changeImage.mutate();
    }
  };
  return { previewUrl, onChange, onClick };
};

export default useChangeProfile;
