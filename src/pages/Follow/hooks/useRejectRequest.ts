import { useMutation, useQueryClient } from '@tanstack/react-query';

import { rejectFollow } from 'api/follow';

const useRejectRequest = () => {
  const queryClient = useQueryClient();
  const { mutate: reject } = useMutation({
    mutationKey: ['reject'],
    mutationFn: (requestId: number) => rejectFollow({ id: requestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['received'] });
      queryClient.invalidateQueries({ queryKey: ['search'] });
    },
  });

  return reject;
};

export default useRejectRequest;
