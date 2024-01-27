import { useQuery } from '@tanstack/react-query';

import { getFollowers } from 'api/mypage';
import { getMe } from 'api/user';

const useMyProfile = () => {
  const { data: profileData, isLoading } = useQuery({ queryKey: ['profile'], queryFn: getMe });
  const { data: followers } = useQuery({ queryKey: ['myFollowers'], queryFn: getFollowers });

  const getTotal = () => profileData?.data.userCountResponse.reviewCount;

  const followerNumber = followers?.data.content.length;

  return {
    profile: profileData?.data, isLoading, getTotal, followerNumber,
  };
};

export default useMyProfile;
