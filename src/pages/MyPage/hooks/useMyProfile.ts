import { getMe } from 'api/user';
import { User } from 'api/user/entity';
import { useQuery } from 'react-query';

type Profile = User & {
  profileImage?: {
    url: string
  },
};
const useMyProfile = () => {
  const { data, isLoading } = useQuery('profile', getMe);
  const profile:Profile | null = data ? data.data : null;
  const getTotal = () => (data ? data.data.userCountResponse.reviewCount : 0);

  return { profile, isLoading, getTotal };
};

export default useMyProfile;
