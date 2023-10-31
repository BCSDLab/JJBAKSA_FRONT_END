import { deleteFollow } from 'api/follow';
import { useMutation, useQueryClient } from 'react-query';

const useDeleteFollow = () => {
  const queryClient = useQueryClient();
  const { mutate: del, data } = useMutation('delete', (account: string) => deleteFollow({ userAccount: account }), {
    onSuccess: () => {
      queryClient.invalidateQueries('follower');
    },
  });

  return { del, data };
};

export default useDeleteFollow;
