import { deleteFollow } from 'api/follow';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteFollow = () => {
  const queryClient = useQueryClient();

  const { mutate: del, data } = useMutation({
    mutationKey: ['delete'],
    mutationFn: (account: string) => deleteFollow({ userAccount: account }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follower'] });
    },
  });

  return { del, data };
};

export default useDeleteFollow;
