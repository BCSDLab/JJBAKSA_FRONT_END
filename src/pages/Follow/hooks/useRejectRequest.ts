import { useMutation, useQueryClient } from 'react-query';
import { rejectFollow } from 'api/follow';

const useRejectRequest = () => {
  const queryClient = useQueryClient();
  const { mutate: reject } = useMutation(['reject'], (requestId: number) => rejectFollow({ id: requestId }), {
    onSuccess: () => {
      queryClient.invalidateQueries('received');
    },
  });
  return reject;
};

export default useRejectRequest;
