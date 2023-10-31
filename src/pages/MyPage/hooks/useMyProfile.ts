import { getFollwers } from 'api/mypage';
import { getMe } from 'api/user';
import { EmailUser } from 'api/user/entity';
import { useQuery } from 'react-query';

type Profile = EmailUser & {
  profileImage?: {
    url: string
  },
};
const useMyProfile = () => {
  const { data: profileData, isLoading } = useQuery('profile', getMe);
  const { data: followers } = useQuery('myFollowers', getFollwers);
  const profile:Profile | null = profileData ? profileData.data as EmailUser : null;
  const getTotal = () => (profileData && 'account' in profileData.data ? profileData.data.userCountResponse.reviewCount : 0);
  const followerNumber = followers?.data.content.length;
  return {
    profile, isLoading, getTotal, followerNumber,
  };
};

export default useMyProfile;
