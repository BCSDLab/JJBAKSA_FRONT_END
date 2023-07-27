import { useAuth } from 'store/auth';
import { FollowerInfo, SearchPageInfo } from '../static/entity';
import FollowList from './FollowList';

export default function SearchPage({ data }: SearchPageInfo) {
  const auth = useAuth();
  const myFriends: FollowerInfo[] = data.filter((follower) => follower.followedType === 'FOLLOWED');
  const newFriends: FollowerInfo[] = data.filter((follower) => follower.followedType !== 'FOLLOWED').filter((follower) => follower.account !== auth?.account);

  return (
    <div>
      <FollowList title="나의 친구" data={myFriends} />
      <FollowList title="새 친구" data={newFriends} />
    </div>
  );
}