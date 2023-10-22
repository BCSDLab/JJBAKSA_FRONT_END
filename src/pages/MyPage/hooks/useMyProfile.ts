import { getFollwers } from 'api/mypage';
import { getMe } from 'api/user';
import { User } from 'api/user/entity';
import { useQuery } from 'react-query';

type Profile = User & {
  profileImage?: {
    url: string
  },
};
const useMyProfile = () => {
  const { data: profileData, isLoading } = useQuery('profile', getMe);
  const { data: followers } = useQuery('myFollowers', getFollwers);
  const profile:Profile | null = profileData ? profileData.data : null;
  const getTotal = () => (profileData ? profileData.data.userCountResponse.reviewCount : 0);
  const followerNumber = followers?.data.content.length;
  return {
    profile, isLoading, getTotal, followerNumber,
  };
};

export default useMyProfile;
