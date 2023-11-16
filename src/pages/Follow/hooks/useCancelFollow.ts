import { cancelFollow } from 'api/follow';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCancelFollow = () => {
  const queryClient = useQueryClient();

  const { mutate: cancel } = useMutation({
    mutationKey: ['cancel'],
    mutationFn: (id: number) => cancelFollow({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sended', 'search'],
      });
    },
  });

  return cancel;
};

export default useCancelFollow;
