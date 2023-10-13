import { acceptFollow } from 'api/follow';
import { useMutation, useQueryClient } from 'react-query';

// 팔로우 승인 후 받은 요청 목록을 다시 받아와 갱신
const useAcceptFollow = () => {
  const queryClient = useQueryClient();
  const { mutate: accept } = useMutation('accept', (id: number) => acceptFollow({ id }), {
    onSuccess: () => {
      queryClient.invalidateQueries('received');
      queryClient.invalidateQueries('follower');
    },
  });
  return accept;
};

export default useAcceptFollow;
