import { getFollowers } from 'api/mypage';
import { getMe } from 'api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

const useMyProfile = () => {
  const { data: profileData, isLoading } = useSuspenseQuery({ queryKey: ['profile'], queryFn: getMe });
  const { data: followers } = useSuspenseQuery({ queryKey: ['myFollowers'], queryFn: getFollowers });

  const getTotal = () => profileData.data.userCountResponse.reviewCount;

  const followerNumber = followers.data.content.length;

  return {
    profile: profileData.data, isLoading, getTotal, followerNumber,
  };
};

export default useMyProfile;
