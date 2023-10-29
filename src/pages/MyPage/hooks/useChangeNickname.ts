import { patchNickname } from 'api/mypage';
import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const useChangeNickname = () => {
  const nicknameRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const changeNickname = useMutation(
    (nickname:string) => patchNickname(nickname),
    { onSuccess: () => queryClient.invalidateQueries('profile') },
  );
  const onClick = (nickname:string) => {
    changeNickname.mutate(nickname);
  };

  return { onClick, nicknameRef };
};

export default useChangeNickname;
