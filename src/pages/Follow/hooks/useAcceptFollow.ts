import { useMutation, useQueryClient } from '@tanstack/react-query';

import { acceptFollow } from 'api/follow';

// 팔로우 승인 후 받은 요청 목록을 다시 받아와 갱신
const useAcceptFollow = () => {
  const queryClient = useQueryClient();
  const { mutate: accept } = useMutation({
    mutationKey: ['accept'],
    mutationFn: (id: number) => acceptFollow({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['follower'],
      });
      queryClient.invalidateQueries({
        queryKey: ['received'],
      });
      queryClient.invalidateQueries({
        queryKey: ['recent'],
      });
    },
  });
  return accept;
};

export default useAcceptFollow;
