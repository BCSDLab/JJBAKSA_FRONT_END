import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchNickname } from 'api/mypage';
import makeToast from 'utils/ts/makeToast';

const useChangeNickname = () => {
  const nicknameRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const changeNickname = useMutation({
    mutationFn: (nickname:string) => patchNickname(nickname),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
    onError: () => makeToast('error', '사용할 수 없는 닉네임입니다.'),
  });
  const onClick = (nickname:string) => {
    changeNickname.mutate(nickname);
  };

  return { onClick, nicknameRef };
};

export default useChangeNickname;
