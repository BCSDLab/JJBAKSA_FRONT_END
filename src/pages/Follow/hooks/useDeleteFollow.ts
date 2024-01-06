import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteFollow } from 'api/follow';
import useBooleanState from 'utils/hooks/useBooleanState';
import useMediaQuery from 'utils/hooks/useMediaQuery';

const useDeleteFollow = () => {
  const queryClient = useQueryClient();
  const { isMobile } = useMediaQuery();
  const [value,,,toggle] = useBooleanState(false);
  const { mutate: del, data } = useMutation({
    mutationKey: ['delete'],
    mutationFn: (account: string) => deleteFollow({ userAccount: account }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follower'] });
    },
  });

  const mobileUnfollow = () => {
    if (isMobile) {
      toggle();
    }
  };

  return {
    del, data, value, mobileUnfollow, isMobile, toggle,
  };
};

export default useDeleteFollow;
