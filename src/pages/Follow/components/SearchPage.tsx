import FollowList from 'pages/Follow/components/FollowList';
import { FollowerInfo, SearchPageInfo } from 'pages/Follow/static/entity';
import { useAuth } from 'store/auth';

export default function SearchPage({ data }: SearchPageInfo) {
  const auth = useAuth();
  const myFriends: FollowerInfo[] = data.filter((follower) => follower.followedType === 'FOLLOWED');
  let newFriends: FollowerInfo[];

  if (auth && 'account' in auth) {
    newFriends = data.filter((follower) => follower.followedType === 'NONE').filter((follower) => follower.account !== auth?.account);
    return (
      <div>
        <FollowList title="나의 친구" data={myFriends} />
        <FollowList title="새 친구" data={newFriends} />
      </div>
    );
  }
  return (
    <div>오류입니다.</div>
  );
}
