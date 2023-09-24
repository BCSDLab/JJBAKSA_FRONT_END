import { useMutation } from 'react-query';
import { secession } from 'api/user';

const useSecession = () => {
  const { mutate: deleteAccount } = useMutation('secession', () => secession());

  return deleteAccount;
};

export default useSecession;
