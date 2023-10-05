import { useAuth } from 'store/auth';
import { FollowerInfo, SearchPageInfo } from '../static/entity';
import FollowList from './FollowList';

export default function SearchPage({ data }: SearchPageInfo) {
  const auth = useAuth();
  const searchFriends: FollowerInfo[] = data.filter((follower) => follower.followedType !== 'REQUEST_SENT').filter((follower) => follower.followedType !== 'REQUEST_RECEIVE').filter((follower) => follower.account !== auth?.account);

  return (
    <div>
      <FollowList title="검색" data={searchFriends} />
    </div>
  );
}
