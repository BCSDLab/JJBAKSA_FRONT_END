import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cancelFollow } from 'api/follow';
import makeToast from 'utils/ts/makeToast';

const useCancelFollow = (account: string) => {
  const queryClient = useQueryClient();
  const { mutate: cancel } = useMutation({
    mutationKey: ['cancel'],
    mutationFn: (id: number) => cancelFollow({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sent'], // 요청한 목록 refetch
      });
      queryClient.invalidateQueries({
        queryKey: ['search'], // 검색 목록 refetch
      });
      makeToast('success', `${account}님에 대한 친구요청을 취소했습니다.`);
    },
  });

  return cancel;
};

export default useCancelFollow;
