import { cancelFollow } from 'api/follow';
import { useMutation, useQueryClient } from 'react-query';

const useCancelFollow = () => {
  const queryClient = useQueryClient();
  const { mutate: cancel } = useMutation('cancel', (id: number) => cancelFollow({ id }), {
    onSuccess: () => {
      queryClient.invalidateQueries('sended');
      queryClient.invalidateQueries('search');
    },
  });

  return cancel;
};

export default useCancelFollow;
