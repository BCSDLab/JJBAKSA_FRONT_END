import { useMutation } from 'react-query';
import { withdrawUser } from 'api/user';

const useWithDrawal = () => {
  const { mutate: deleteAccount } = useMutation('withdrawUser', () => withdrawUser());

  return deleteAccount;
};

export default useWithDrawal;
