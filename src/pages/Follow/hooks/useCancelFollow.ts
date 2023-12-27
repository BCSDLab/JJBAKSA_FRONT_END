import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cancelFollow } from 'api/follow';

const useCancelFollow = () => {
  const queryClient = useQueryClient();
  const { mutate: cancel } = useMutation({
    mutationKey: ['cancel'],
    mutationFn: (id: number) => cancelFollow({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sent', 'search'],
      });
    },
  });

  return cancel;
};

export default useCancelFollow;
