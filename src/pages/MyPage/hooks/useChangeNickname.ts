import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchNickname } from 'api/mypage';

const useChangeNickname = () => {
  const nicknameRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const changeNickname = useMutation({
    mutationFn: (nickname:string) => patchNickname(nickname),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
  });
  const onClick = (nickname:string) => {
    changeNickname.mutate(nickname);
  };

  return { onClick, nicknameRef };
};

export default useChangeNickname;
