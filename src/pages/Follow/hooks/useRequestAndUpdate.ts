import { requestFollow } from 'api/follow';
import { useMutation, useQueryClient } from 'react-query';

// 팔로우 요청 후 유저 목록을 다시 받아와 요청중 상태로 변경
const useRequestAndUpdate = () => {
  const queryClient = useQueryClient();
  const { mutate: request } = useMutation('request', (account: string) => requestFollow({ userAccount: account }), {
    onSuccess: () => {
      queryClient.invalidateQueries('sended');
      queryClient.invalidateQueries('search');
    },
  });
  return request;
};

export default useRequestAndUpdate;
