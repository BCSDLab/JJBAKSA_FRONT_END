import { SearchPageInfo } from './entity';
import FollowList from './FollowList';

export default function SearchPage({ data }: SearchPageInfo) {
  return (
    <div>
      <FollowList title="나의 친구" data={data} />
      <FollowList title="새 친구" data={data} />
    </div>
  );
}
