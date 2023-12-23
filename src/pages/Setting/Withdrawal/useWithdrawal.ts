import { useMutation } from '@tanstack/react-query';
import { withdrawUser } from 'api/user';

const useWithDrawal = () => {
  const { mutate: deleteAccount } = useMutation({
    mutationKey: ['withdrawUser'],
    mutationFn: () => withdrawUser(),
  });

  return deleteAccount;
};

export default useWithDrawal;
